(ns tramboard-clj.components.board
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [cljs-time.core :refer [now]]
            [cljs.core.async :refer [put! chan <! >! close! timeout]]
            [tramboard-clj.components.icon :refer [number-icon transport-icon]]
            [tramboard-clj.script.util :refer [edit-or-add-destination get-destination init-destinations wait-on-channel ga]]
            [tramboard-clj.script.client :refer [fetch-stationboard-data]]
            [tramboard-clj.script.util :refer [wait-on-channel]]))

(defn- display-in-minutes [in-minutes]
  (if (< in-minutes 60) (str in-minutes "’") "..."))

(defn- merge-station-data-and-set-loading [station-data ids]
  (let [station-data-without-removed-ids (into {} (filter #(contains? ids (key %)) station-data))
        ids-without-loaded-stations      (remove #(contains? station-data %) ids)
        new-station-data                 (merge station-data-without-removed-ids (into {} (map (fn [id] [id :loading]) ids-without-loaded-stations)))]
    new-station-data))

(defn- keep-non-excluded [number acc data]
  (if 
    (or (empty? data) (= number 0)) acc
    (let [[head & tail] data]
      (if (:excluded head) 
        (keep-non-excluded number (conj acc head) tail)
        (keep-non-excluded (- number 1) (conj acc head) tail)))))

(defn- arrivals-from-station-data [station-data current-view]
  (let [arrivals (->> station-data
                      (remove #(or (= :loading (val %)) (= :error (val %))))
                      (map (fn [station-data-entry] (map #(assoc % :stop-id (key station-data-entry)) (val station-data-entry))))
                      (flatten)
                      (sort-by :departure-timestamp)
                      ; we filter out the things we don't want to see
                      (map #(let [stop (get (:stops current-view) (:stop-id %))]
                              (assoc % :excluded (:excluded (get-destination (:known-destinations stop) %)))))
                      ; we filter out the things that left more than 0 minutes ago
                      (remove #(< (:in-minutes %) 0))
                      (keep-non-excluded 30 []))]
    arrivals))


(defn- are-all-loading [station-data]
  (empty? (remove #(= :loading (val %)) station-data)))

(defn- are-all-error-or-empty [station-data]
  (empty? (remove #(or (= :error (val %)) (and (not= :loading (val %)) (empty? (val %)))) station-data)))

(defn- arrival-row [{:keys [arrival]} owner {:keys [add-filter-ch]}]
  (reify
    om/IRender
    (render [this]
            (println "Rendering row")
            
            (let [type        (:type arrival)
                  in-minutes  (:in-minutes arrival)
                  number      (:number arrival)
                  to          (:to arrival)
                  accessible  (:accessible arrival)
                  is-realtime (:is-realtime arrival)
                  excluded    (:excluded arrival)]
              (dom/div #js {:className (str "board-row " (when excluded "hidden"))}
                       (dom/div nil (om/build number-icon {:number number :colors (:colors arrival) :type type}))
                       (dom/div #js {:className "board-row-station"}
                                (dom/span #js {:className "board-row-station-name"
                                               :aria-label (str "destination " to (when accessible (str ". this " type " is accessible by wheelchair")))}
                                          to (when accessible (dom/i #js {:className "fa fa-wheelchair"}))))
                       (dom/div #js {:className "board-row-departure thin"}
                                (dom/div #js {:className "board-row-departure-actual"} (:time arrival))
                                (dom/div #js {:className "board-row-departure-scheduled"} (if-not is-realtime "no real-time data" (:undelayed-time arrival))))
                       (dom/div #js {:className (str "board-row-time board-row-time" in-minutes " " (if (> in-minutes 100) "board-row-time100"))}
                                (om/build transport-icon {:type type :accessible-text "arriving now"})
                                (dom/span #js {:className "board-row-time-text bold"
                                               :aria-label (str "arriving in " in-minutes " minutes")} (str in-minutes "’"))))))))

(defn- arrival-table [{:keys [arrivals]} owner opts]
  (reify
    om/IRender
    (render [this]
            (apply dom/div nil
                   (map #(om/build arrival-row {:arrival %} {:opts opts}) arrivals)))))


(defn arrival-tables-view [{:keys [current-view]} owner {:keys [refresh-rate transform-stationboard-data]}]
  "Takes as input a set of views (station id) and the size of the pane and renders the table views."
  (let [initialize
        (fn [current current-owner]
          (let [stop-ids (set (keys (:stops current)))]
            (let [{:keys [view-change-ch station-data]} (om/get-state owner)]
              (when (not= stop-ids (set (keys station-data)))
                (println (str "Initializing arrival tables with stops: " stop-ids))
                (put! view-change-ch stop-ids)))))]
    (reify
      om/IInitState
      (init-state [_]
                  (println (str "Resetting state"))
                  {:station-data {} :arrival-channels {} :view-change-ch (chan)})
      om/IWillMount
      (will-mount [_]
                  ; the is the control channel loop
                  (let [{:keys [view-change-ch]} (om/get-state owner)]
                    (wait-on-channel
                      view-change-ch
                      (fn [stop-ids]
                        (println (str "Got view-change message with stops: " stop-ids))
                        (om/update-state!
                          owner
                          (fn [state]
                            (let [old-arrival-channels  (:arrival-channels state)
                                  old-cancel-ch         (:cancel-ch old-arrival-channels)
                                  old-incoming-ch       (:incoming-ch old-arrival-channels)
                                  old-fetch-ch          (:fetch-ch old-arrival-channels)
                                  new-cancel-ch         (chan)
                                  new-incoming-ch       (chan)
                                  new-fetch-ch          (chan)
                                  station-data          (:station-data state)]
                              (when old-cancel-ch   (close! old-cancel-ch))
                              (when old-incoming-ch (close! old-incoming-ch))
                              (when old-fetch-ch    (close! old-fetch-ch))
                              ; we initialize the incoming channel loop
                              (wait-on-channel
                                new-incoming-ch
                                (fn [output]
                                  (let [{:keys [data stop-id error]} output]
                                    (println (str "Received data for stop: " stop-id))
                                    
                                    ; we just validate here the stop id
                                    (if (and (not error) stop-id)
                                      (do
                                        (om/update-state! owner :station-data #(assoc % stop-id data))
                                        ; we update the list of existing destinations
                                        (om/transact! current-view [:stops stop-id]
                                                      (fn [stop]
                                                        ; we add all the known destinations to the stop
                                                        (let [existing-known-destinations (or (:known-destinations stop) (init-destinations))
                                                              new-known-destinations (reduce #(edit-or-add-destination %1 %2) existing-known-destinations data)]
                                                          (assoc stop
                                                            :known-destinations new-known-destinations)))))
                                      (om/update-state! owner :station-data #(assoc % stop-id :error))))))
                              ; we initialize the fetch loop
                              (wait-on-channel
                                new-fetch-ch
                                (fn [stop-id]
                                  (println (str "Received fetch message for stop: " stop-id))
                                  (ga "send" "event" "stop" "query" {:dimension1 stop-id
                                                                     "nonInteraction" 1})
                                  (fetch-stationboard-data stop-id new-incoming-ch
                                                           new-incoming-ch new-cancel-ch
                                                           transform-stationboard-data)
                                  (go (<! (timeout refresh-rate))
                                      (println (str "Putting onto fetch channel: " stop-id))
                                      (put! new-fetch-ch stop-id))))
                              
                              ; we ask the channel to fetch the new data
                              (doseq [stop-id stop-ids]
                                (println (str "Initializing fetch loop for: " stop-id))
                                (put! new-fetch-ch stop-id))
                              
                              (assoc (update-in state [:arrival-channels]
                                                #(assoc %
                                                   :incoming-ch new-incoming-ch
                                                   :cancel-ch   new-cancel-ch
                                                   :fetch-ch    new-fetch-ch))
                                :station-data (merge-station-data-and-set-loading station-data stop-ids)))))))
                    (println (str "Initializing on WillMount"))
                    (initialize current-view owner)))
      om/IWillReceiveProps
      (will-receive-props [_ {:keys [current-view]}]
                          (println (str "Initializing on WillReceiveProps"))
                          (initialize current-view owner))
      om/IWillUnmount
      (will-unmount [_]
                    (println "Closing all channels on WillUnmount")
                    ; we kill the channel
                    (let [{:keys [view-change-ch arrival-channels]} (om/get-state owner)]
                      (close! view-change-ch)
                      (let [cancel-ch   (:cancel-ch arrival-channels)
                            incoming-ch (:incoming-ch arrival-channels)
                            fetch-ch    (:fetch-ch arrival-channels)]
                        (when cancel-ch (close! cancel-ch))
                        (when incoming-ch (close! incoming-ch))
                        (when fetch-ch (close! fetch-ch)))))
      om/IRenderState
      (render-state [this {:keys [station-data add-filter-ch]}]
                    
                    (let [arrivals  (arrivals-from-station-data station-data current-view)
                          loading   (are-all-loading station-data)
                          error     (are-all-error-or-empty station-data)]
                      (println "Rendering arrival table")                      
                      (dom/div #js {:className "responsive-display board-table"}
                               (dom/div #js {:className (str "text-center ultra-thin loading " (when-not loading "hidden"))} "Your departures are loading...")
                               (dom/div #js {:className (str "text-center ultra-thin loading " (when (or (not error) loading) "hidden"))} "Sorry, no departures are available at this time...")
                               (om/build arrival-table {:arrivals arrivals} {:opts {:add-filter-ch add-filter-ch}})))))))
