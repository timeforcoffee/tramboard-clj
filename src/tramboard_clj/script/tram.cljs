(ns tramboard-clj.script.tram
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [cljs.core.async :refer [put! chan <! >! close! timeout]]
            [clojure.string :as str]
            [cljs-time.core :refer [minute hour in-minutes interval now after? minus weeks within? days to-default-time-zone]]
            [cljs-time.format :refer [parse unparse formatters formatter show-formatters]]
            [cljs-time.coerce :refer [to-long from-long]]
            [goog.events :as events]
            [goog.array :as g-array]
            [cljs-uuid.core :as uuid]
            [arosequist.om-autocomplete :as ac]
            [arosequist.om-autocomplete.bootstrap :as acb]
            [cljs.reader :as reader]
            [tramboard-clj.script.time :refer [parse-from-date-time format-to-hour-minute display-time minutes-from]]
            [tramboard-clj.script.state :refer [is-home is-edit is-split get-state go-home go-edit go-toggle-split modify-complete-state get-all-states]])
  (:import [goog.net XhrIo]))

(enable-console-print!)

; some global constants here
(def refresh-rate 10000)

; our initial app state
(defonce app-state
  (atom {; views from local storage
         :configured-views (array-map)
         ; navigation state
         :complete-state {:split-states {:state-1 {:state-id :state-1 :state :home :params {} :visible true}
                                         :state-2 {:state-id :state-2 :state :home :params {} :visible false}}
                          :order [:state-1 :state-2]}}))

(defn- wait-on-channel [channel function]
  (go
    (loop []
      (when-some
        [channel-output (<! channel)]
        (function channel-output)
        (recur)))))

(defn- uuid [] (str (uuid/make-random)))

(defn- ga [& more]
  (when js/ga
    (.. (aget js/window "ga")
        (apply nil (clj->js more)))))

(defn- deep-merge
  "Recursively merges maps. If vals are not maps, the last value wins."
  [& vals]
  (if (every? map? vals)
    (apply merge-with deep-merge vals)
    (last vals)))

(defn- cap [string x letter]
  (if (= 0 (- x (count string))) string (cap (str letter string) x letter)))

(defn- display-in-minutes [in-minutes]
  (if (< in-minutes 59) in-minutes ">59"))

(defn- update-updated-date [view]
  (assoc view :last-updated (to-long (now))))

(defn current-view [current-state configured-views]
  (let [view-id (:view-id (:params current-state))]
    (get configured-views view-id)))

(defn get-stops-in-order [view]
  (map #(get (:stops view) %) (:stops-order view)))

(defn is-in-destinations [destinations arrival]
  (let [keys              [:to :number]
        is-in-destination (contains? (into #{} (map #(select-keys % keys) destinations))
                                     ; the entry that corresponds to the destination
                                     (select-keys arrival keys))]
    is-in-destination))

(defn get-destinations-not-excluded [stop]
  (remove #(is-in-destinations (:excluded-destinations stop) %) (:known-destinations stop)))

(defn get-recent-board-views [configured-views complete-state]
  (let [views              (map #(val %) configured-views)
        selected-views-ids (into #{} (map #(:view-id (:params (val %))) (:split-states complete-state)))]
    (remove #(contains? selected-views-ids (:view-id %)) views)))

(defn- remove-stop-and-update-date [current-view stop-id]
  (let [new-stops        (dissoc (:stops current-view) stop-id)
        new-stops-order  (vec (remove #(= stop-id %) (:stops-order current-view)))
        new-current-view (update-updated-date (assoc current-view
                                                :stops new-stops
                                                :stops-order new-stops-order))]
    new-current-view))

(defn- add-stop-and-update-date [current-view {:keys [:id] :as stop}]
  (let [existing-stops       (:stops current-view)
        existing-stops-order (or (:stops-order current-view) [])
        existing-stop        (get existing-stops id)
        new-stops            (assoc existing-stops id (merge (or existing-stop {}) stop))
        new-stops-order      (if-not existing-stop (conj existing-stops-order id) existing-stops-order)
        new-current-view     (update-updated-date (assoc current-view
                                                    :stops new-stops
                                                    :stops-order new-stops-order))]
    new-current-view))

(defn- delete-view-if-no-stops [configured-views view-id]
  (let [current-view  (get configured-views view-id)
        current-stops (:stops current-view)]
    (if (empty? current-stops)
      ; we dissoc the current view and set the state to home
      (dissoc configured-views view-id)
      configured-views)))

(defn transact-add-stop [app state stop]
  (om/transact!
    app (fn [app]
          (let [configured-views     (:configured-views app)
                complete-state       (:complete-state app)
                current-state        (get-state complete-state (:state-id state))
                is-new-view          (not (is-edit current-state))
                view-id              (if is-new-view (uuid) (:view-id (:params current-state)))
                new-complete-state   (modify-complete-state complete-state current-state #(go-edit % view-id))
                current-view         (or (get configured-views view-id) {:view-id view-id})
                new-view             (add-stop-and-update-date current-view stop)
                new-configured-views (assoc configured-views view-id new-view)]
            (ga "send" "event" "stop" "add" {:dimension1 (:id stop)})
            (assoc app :configured-views new-configured-views :complete-state new-complete-state)))))

(defn transact-remove-stop [app state stop-id]
  (om/transact!
    app (fn [app]
          (let [configured-views     (:configured-views app)
                complete-state       (:complete-state app)
                current-state        (get-state complete-state (:state-id state))
                current-view         (current-view current-state configured-views)
                view-id              (:view-id current-view)
                stop-id              (if-not stop-id (last (:stops-order current-view)) stop-id)
                new-view             (remove-stop-and-update-date current-view stop-id)
                new-configured-views (delete-view-if-no-stops (assoc configured-views view-id new-view) view-id)
                go-home?             (not (get new-configured-views view-id))
                new-complete-state   (modify-complete-state complete-state current-state #(if go-home? (go-home %) %))]
            (ga "send" "event" "stop" "remove" {:dimension1 stop-id})
            (assoc app :configured-views new-configured-views :complete-state new-complete-state)))))

(defn transact-add-filter [view arrival]
  (let [stop-id     (:stop-id arrival)
        number      (:number arrival)
        destination (:to arrival)
        colors      (:colors arrival)]
    (om/transact!
      view (fn [view]
             ; we add the filter
             (let [stop                           (get (:stops view) stop-id)
                   existing-excluded-destinations (or (:excluded-destinations stop) #{})
                   new-excluded-destinations      (conj existing-excluded-destinations {:to destination :number number})
                   new-current-view               (update-updated-date
                                                    (assoc-in view [:stops stop-id :excluded-destinations] new-excluded-destinations))]
               (println new-current-view)
               new-current-view)))))

(defn transact-remove-filters [view]
  (om/transact! view
                (fn [view]
                  ; we remove all the filters
                  (let [stops            (:stops view)
                        new-stops-vector (map #(vector (first %) (dissoc (second %) :excluded-destinations)) stops)
                        new-current-view (update-updated-date (assoc view :stops (apply assoc stops (flatten new-stops-vector))))]
                    new-current-view))))

(defn fetch-suggestions [value suggestions-ch cancel-ch transformation-fn]
  (let [xhr        (XhrIo.)
        abort-chan (chan)]
    ; we introduce some timeout here
    (go (<! (timeout 250)) (put! abort-chan false))

    (go
      (when-not (<! abort-chan)
        (goog.events/listen
          xhr goog.net.EventType.SUCCESS
          (fn [e] (put! suggestions-ch (:stations (js->clj (.getResponseJson xhr) :keywordize-keys true)))))
        (goog.events/listen
          xhr goog.net.EventType.ERROR
          (fn [e] (println "ERROR")))
        (.send xhr (str "/api/stations/" value) "GET")))
    (go
      (<! cancel-ch)
      (do
        (put! abort-chan true)
        (.abort xhr)))))

(defn fetch-stationboard-data [stop-id complete-ch error-ch cancel-ch transformation-fn]
  (let [xhr (XhrIo.)]
    (.setTimeoutInterval xhr 10000)
    (goog.events/listen
      xhr goog.net.EventType.SUCCESS
      (fn [e] (put! complete-ch {:stop-id stop-id :data (transformation-fn (js->clj (.getResponseJson xhr) :keywordize-keys true))})))
    (goog.events/listen
      xhr goog.net.EventType.ERROR
      (fn [e] (put! error-ch {:stop-id stop-id :data [] :error (.getLastError xhr)})))
    (.send xhr (str "/api/stationboard/" stop-id) "GET")
    (go
      (<! cancel-ch)
      (.abort xhr))))

(defn transform-stationboard-data [json-data]
  (->> (:departures json-data)
       (map
         (fn [entry]
           (let [scheduled-departure (:scheduled (:departure entry))
                 ; TODO show something if we don't have realtime infos
                 realtime-departure  (or (:realtime (:departure entry)) scheduled-departure)
                 departure-timestamp (parse-from-date-time realtime-departure)
                 now                 (now)]
             {:departure-timestamp departure-timestamp
              :colors              (:colors entry)
              :type                (:type entry)
              :accessible          (:accessible entry)
              :number              (:name entry)
              :to                  (:to entry)
              :in-minutes          (minutes-from departure-timestamp now)
              :time                (format-to-hour-minute departure-timestamp)
              :undelayed-time      (when (not= realtime-departure scheduled-departure)
                                     (let [scheduled-departure-timestamp (parse-from-date-time scheduled-departure)]
                                       (format-to-hour-minute scheduled-departure-timestamp)))})))))

(defn merge-station-data-and-set-loading [station-data ids]
  (let [station-data-without-removed-ids (into {} (filter #(contains? ids (key %)) station-data))
        ids-without-loaded-stations      (remove #(contains? station-data %) ids)
        new-station-data                 (merge station-data-without-removed-ids (into {} (map (fn [id] [id :loading]) ids-without-loaded-stations)))]
    new-station-data))

(defn arrivals-from-station-data [station-data current-view]
  (let [arrivals (->> station-data
                      (remove #(or (= :loading (val %)) (= :error (val %))))
                      (map (fn [station-data-entry] (map #(assoc % :stop-id (key station-data-entry)) (val station-data-entry))))
                      (flatten)
                      (sort-by :departure-timestamp)
                      ; we filter out the things we don't want to see
                      (remove #(let [stop (get (:stops current-view) (:stop-id %))]
                                 (is-in-destinations (:excluded-destinations stop) %)))
                      (take 30))]
    arrivals))

(defn are-all-loading [station-data]
  (empty? (remove #(= :loading (val %)) station-data)))

(defn are-all-error-or-empty [station-data]
  (empty? (remove #(or (= :error (val %)) (and (not= :loading (val %)) (empty? (val %)))) station-data)))

(defn exclude-destination-link [{:keys [arrival current-view]} owner]
  (reify
    om/IRender
    (render [this]
            (dom/a #js {:href "#"
                        :className "link-icon"
                        :title "Exclude destination"
                        :onClick (fn [e]
                                   (transact-add-filter current-view arrival)
                                   (.preventDefault e))}
                   (dom/span #js {:style #js {:display "none"}} "(exclude from view)") "✖"))))

(defn number-icon [{:keys [number colors]} owner]
  (reify
    om/IRender
    (render [this]
            (let [big     (>= (count number) 3)
                  too-big (>= (count number) 5)]
              (dom/span #js {:className (str "bold number-generic number-" number (when big " number-big"))
                             :style #js {:backgroundColor (:bg colors) :color (:fg colors)}}
                        (if too-big (apply str (take 4 number)) number))))))

(defn transport-icon [type owner]
  (reify
    om/IRender
    (render [this]
            (let [map-transport-icon (fn [type] (case type
                                                  "tram"        "fa-tram"
                                                  "subway"      "fa-train"
                                                  "rack-train"  "fa-subway"
                                                  "cable-car"   "fa-cable-car"
                                                  "bus"         "fa-bus"
                                                  "train"       "fa-subway"
                                                  "taxi"        "fa-taxi"
                                                  "boat"        "fa-ship"

                                                  "train"))
                  icon               (dom/i #js {:className (str "fa " (map-transport-icon type))})]
              (if (or (= type "tram") (= type "cable-car"))
                (dom/span #js {:className "span-fa"} icon (dom/span #js {:className "hidden"} "transport icon"))
                icon)))))

(defn arrival-row [{:keys [arrival current-view current-state] :as app} owner]
  (reify
    om/IRender
    (render [this]
            (println "Rendering row")

            (let []
              (dom/tr #js {:className "tram-row"}
                      (dom/td #js {:className "number-cell"} (om/build number-icon {:number (:number arrival) :colors (:colors arrival)}))
                      (dom/td #js {:className "station"}
                              (dom/span #js {:className "exclude-link"} (om/build exclude-destination-link app))
                              (dom/span #js {:className "station-name"}
                                        (:to arrival)
                                        (when (:accessible arrival) (dom/i #js {:className "bold fa fa-wheelchair"}))))
                      (dom/td #js {:className "departure thin"}
                              (dom/div nil (:time arrival))
                              (dom/div #js {:className "undelayed"} (:undelayed-time arrival)))
                      (let [display-in-minutes  (display-in-minutes (:in-minutes arrival))]
                        (dom/td #js {:className (str "text-right time time" (:in-minutes arrival))}
                                (om/build transport-icon (:type arrival))
                                (dom/div #js {:className "bold pull-right"} display-in-minutes))))))))

(defn arrival-table [{:keys [arrivals current-view current-state]} owner]
  (reify
    om/IRender
    (render [this]
            (dom/table #js {:className "tram-table"}
                       (apply dom/tbody nil
                              (map #(om/build arrival-row {:arrival % :current-view current-view :current-state current-state}) arrivals))))))

(defn stop-heading [current-view owner]
  "This displays all the links"
  (reify
    om/IRender
    (render [this]
            (dom/div #js {:className "stop-heading"}
                     (dom/h2 #js {:className "heading thin"} (str "Trams / buses / trains departing from " (str/join " / " (map #(:name %) (get-stops-in-order current-view)))))))))

(defn control-bar [{:keys [current-state current-view]} owner]
  (reify
    om/IWillMount
    (will-mount [_]
                (let [{:keys [activity-ch]} (om/get-state owner)]
                  (wait-on-channel
                    activity-ch
                    (fn [_] (om/update-state!
                              owner
                              (fn [s]
                                (let [old-hide-ch (:hide-ch s)
                                      new-hide-ch (chan)]
                                  (when old-hide-ch (close! old-hide-ch))

                                  (go (when-some [hide (<! new-hide-ch)]
                                                 (when hide
                                                   (om/transact! current-state :params #(assoc % :activity :idle)))))

                                  (go (<! (timeout 2000))
                                      (println "Putting true on hide channel")
                                      (put! new-hide-ch true))

                                  (om/transact! current-state :params
                                                (fn [params] (if (get params :activity) (dissoc params :activity) params)))

                                  (assoc s :hide-ch new-hide-ch))))))))
    om/IWillUnmount
    (will-unmount [this]
                  (let [hide-ch (om/get-state owner :hide-ch)]
                    (when hide-ch (close! hide-ch))))
    om/IRender
    (render [this]
            (let [excluded-destinations (remove nil? (flatten (map #(:excluded-destinations (val %)) (:stops current-view))))
                  expanded              (= :expanded (:display (:params current-state)))]
              (dom/div #js {:className "control-bar"}
                       (dom/a #js {:href "#"
                                   :className (str "link-icon glyphicon " (if expanded "glyphicon-resize-small" "glyphicon-resize-full"))
                                   :title (if expanded "Exit fullscreen" "Fullscreen")
                                   :onClick (fn [e]
                                              ; we change the state to hidden
                                              (if expanded
                                                (om/transact! current-state :params #(dissoc % :display ))
                                                (om/transact! current-state :params #(assoc % :display :expanded)))
                                              (.preventDefault e))})
                       (dom/a #js {:href "#"
                                   :className (str "remove-filter link-icon " (when (empty? excluded-destinations) "hidden"))
                                   :onClick (fn [e]
                                              (.preventDefault e)
                                              (transact-remove-filters current-view))}
                              (dom/span #js {:className "remove-filter-image"} "✖") (dom/span #js {:className "remove-filter-text"} "remove filters")))))))

(defn arrival-tables-view [{:keys [current-view current-state]} owner]
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
                  {:station-data {} :arrival-channels {} :activity-ch (chan) :view-change-ch (chan)})
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

                                    (go (<! (timeout refresh-rate))
                                        (println (str "Putting onto fetch channel: " stop-id))
                                        (put! new-fetch-ch stop-id))

                                    ; we just validate here the stop id
                                    (if (and (not error) stop-id)
                                      (do
                                        (om/update-state! owner :station-data #(assoc % stop-id data))
                                        ; we update the list of existing destinations
                                        (om/transact! current-view [:stops stop-id]
                                                      (fn [stop]
                                                        ; we add all the known destinations to the stop
                                                        (let [existing-known-destinations (or (:known-destinations stop) #{})
                                                              new-known-destinations      (map #(select-keys % [:to :number :colors]) data)]
                                                          (assoc stop
                                                            :known-destinations
                                                            (into existing-known-destinations new-known-destinations))))))
                                      (om/update-state! owner :station-data #(assoc % stop-id :error))))))
                              ; we initialize the fetch loop
                              (wait-on-channel
                                new-fetch-ch
                                (fn [stop-id]
                                  (println (str "Received fetch message for stop: " stop-id))
                                  (ga "send" "event" "stop" "query" {:dimension1 stop-id})
                                  (fetch-stationboard-data stop-id new-incoming-ch
                                                           new-incoming-ch new-cancel-ch
                                                           transform-stationboard-data)))

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
                    (let [{:keys [view-change-ch activity-ch arrival-channels]} (om/get-state owner)]
                      (close! view-change-ch)
                      (close! activity-ch)
                      (let [cancel-ch   (:cancel-ch arrival-channels)
                            incoming-ch (:incoming-ch arrival-channels)
                            fetch-ch    (:fetch-ch arrival-channels)]
                        (when cancel-ch (close! cancel-ch))
                        (when incoming-ch (close! incoming-ch))
                        (when fetch-ch (close! fetch-ch)))))
      om/IRenderState
      (render-state [this {:keys [station-data activity-ch]}]

                    (let [arrivals  (arrivals-from-station-data station-data current-view)
                          on-action (fn [preventDefault e]
                                      (put! activity-ch true)
                                      (when preventDefault (.preventDefault e)))
                          loading   (are-all-loading station-data)
                          error     (are-all-error-or-empty station-data)]

                      (println "Rendering arrival table")

                      (dom/div #js {:onMouseMove #(on-action true %)
                                    :onClick #(on-action true %)
                                    :onTouchStart #(on-action false %)}
                               (om/build control-bar {:current-state current-state :current-view current-view} {:init-state {:activity-ch activity-ch}})
                               (dom/div #js {:className (str "text-center ultra-thin loading " (when-not loading "hidden"))} "Your departures are loading...")
                               (dom/div #js {:className (str "text-center ultra-thin loading " (when (or (not error) loading) "hidden"))} "Sorry, no departures are available at this time...")
                               (om/build arrival-table {:arrivals arrivals :current-view current-view :current-state current-state})))))))

(defn autocomplete [{:keys [app current-state]} owner {:keys [input-id input-placeholder]}]
  (reify
    om/IInitState
    (init-state [_]
                {:result-ch (chan)})
    om/IWillMount
    (will-mount [_]
                (let [result-ch (om/get-state owner :result-ch)]
                  (wait-on-channel
                    result-ch
                    (fn [output]
                      (let [[idx result] output]
                        (when (not (nil? result))
                          (transact-add-stop app current-state result)))))))
    om/IRenderState
    (render-state [_ {:keys [result-ch backspace-ch input-style]}]
                  (om/build ac/autocomplete {}
                            (acb/add-bootstrap-m
                              {:state {:input-state {:style input-style}}
                               :opts
                               {:suggestions-fn (fn [value suggestions-ch cancel-ch]
                                                  (if (str/blank? value) (put! suggestions-ch [])
                                                    (fetch-suggestions value suggestions-ch cancel-ch identity)))
                                :result-ch      result-ch
                                :result-text-fn (fn [item _] (:name item))
                                :input-opts     {:placeholder    input-placeholder
                                                 :id             input-id
                                                 :on-key-down    (fn [e value handler]
                                                                   (let [keyCode (.-keyCode e)]
                                                                     (case (.-keyCode e)
                                                                       8  (when (str/blank? value) (put! backspace-ch true))
                                                                       (handler e))))}}})))))

(defn edit-remove-button [{:keys [current-stop app current-state]} owner]
  (reify
    om/IRender
    (render [this]
            (let [stop-id (:id current-stop)]
              (dom/button #js {:className "btn btn-primary"
                               :type "button"
                               :onClick (fn [e]
                                          (transact-remove-stop app current-state stop-id)
                                          (.preventDefault e))}
                          (:name current-stop)
                          (dom/span #js {:className "glyphicon glyphicon-remove" :aria-hidden "true"}))))))


(defn edit-pane [{:keys [app current-state]} owner]
  "This shows the edit pane to add stops and stuff"
  (let [set-sizes
        (fn [current-owner prev-state]
          (let [button-padding     4   ; TODO link this to CSS somehow
                min-input-width    200 ; TODO link this to CSS somehow
                input-padding      42  ; TODO link this to CSS somehow
                container          (om/get-node current-owner "container")
                container-width    (.-offsetWidth container)
                buttons            (g-array/toArray (.-children (om/get-node current-owner "buttons")))
                buttons-width      (apply + (map #(+ button-padding (.-offsetWidth %)) buttons))
                new-buttons-width  (if (< container-width buttons-width) container-width buttons-width)
                prev-buttons-width (:buttons-width prev-state)
                new-input-width    (- (if (< (- container-width new-buttons-width) min-input-width) container-width (- container-width new-buttons-width)) input-padding)
                prev-input-width   (:input-width prev-state)]
            (when (or (nil? prev-buttons-width) (not= prev-buttons-width new-buttons-width))
              (om/set-state! current-owner :buttons-width new-buttons-width))
            (when (or (nil? prev-input-width) (not= prev-input-width new-input-width))
              (om/set-state! current-owner :input-width new-input-width))))]
    (reify
      om/IInitState
      (init-state [_]
                  {:backspace-ch (chan)})
      om/IWillMount
      (will-mount  [_]
                  (let [backspace-ch (om/get-state owner :backspace-ch)]
                    (wait-on-channel
                      backspace-ch
                      (fn [backspace]
                        (when (not (nil? backspace)) (transact-remove-stop app current-state nil))))))
      om/IWillUnmount
      (will-unmount [_]
                    (let [{:keys [backspace-ch]} (om/get-state owner)]
                      (close! backspace-ch)))
      om/IDidMount
      (did-mount [_]
                 (set-sizes owner (om/get-state owner)))
      om/IDidUpdate
      (did-update [_ _ prev-state]
                  (set-sizes owner prev-state))
      om/IRenderState
      (render-state [_ {:keys [backspace-ch buttons-width input-width]}]
                    (let [configured-views (:configured-views app)
                          current-view     (current-view current-state configured-views)]

                      (println "Rendering edit-pane with state " current-state)
                      (dom/form #js {:className "edit-form"}
                                (dom/div #js {:className "form-group form-group-lg"}
                                         (dom/label #js {:className "control-label sr-only"
                                                         :htmlFor   "stopInput"} "Stop")
                                         (dom/span #js {:className "form-control thin"
                                                        :ref       "container"}
                                                   (apply dom/span #js {:className "buttons"
                                                                        :ref       "buttons"
                                                                        :style     #js {:width (str buttons-width "px")}}
                                                          (map #(om/build edit-remove-button {:app app :current-stop % :configured-views configured-views :current-state current-state}) (get-stops-in-order current-view)))
                                                   (om/build autocomplete {:app app :configured-views configured-views :current-state current-state}
                                                             {:init-state {:backspace-ch   backspace-ch}
                                                              :state {:input-style #js {:width (str input-width "px")}}
                                                              :opts {:input-id          "stopInput"
                                                                     :input-placeholder "Enter a stop"}})))))))))

(defn recent-board-item-stop [stop owner]
  (reify
    om/IRender
    (render [this]
            (dom/li nil (:number stop)))))

(defn recent-board-item-number [number-with-colors owner]
  (reify
    om/IRender
    (render [this]
            (dom/li nil
                    (om/build number-icon number-with-colors)))))

(defn recent-board-item [{:keys [configured-view current-state]} owner]
  (reify
    om/IRender
    (render [this]
            (dom/div #js {:className "recent-board"}
                     (dom/a #js {:href "#"
                                 :onClick (fn [e]
                                            (om/transact! current-state #(go-edit % (:view-id configured-view)))
                                            (.preventDefault e))}
                            ; a list of all stops
                            (dom/h2 #js {:className "thin"}
                                    (str/join " / " (map #(:name %) (get-stops-in-order configured-view))))
                            ; a thumbnail of all trams
                            (dom/div #js {:className "number-list"}
                                     (let [numbers         (->> (:stops configured-view)
                                                                (map #(get-destinations-not-excluded (val %)))
                                                                (reduce into #{})
                                                                (map #(select-keys % [:number :colors]))
                                                                (distinct)
                                                                (sort-by #(cap (:number %) 20 "0")))
                                           too-big         (> (count numbers) 9)
                                           numbers-to-show (if too-big (conj (vec (take 8 numbers)) {:number "..."}) numbers)]
                                       (apply dom/ul #js {:className "list-inline"} (om/build-all recent-board-item-number numbers-to-show)))))))))

(defn recent-boards [{:keys [app current-state]} owner]
  (reify
    om/IRender
    (render [this]
            (let [configured-views (:configured-views app)
                  complete-state   (:complete-state app)
                  recent-views     (get-recent-board-views configured-views complete-state)]
              (apply dom/div nil
                     (dom/div #js {:className "heading"}
                              (dom/h1 #js {:className "heading thin"} "Your recent boards"))
                     (map #(om/build recent-board-item {:configured-view % :current-state current-state}) recent-views))))))

(defn menu-icon [{:keys [current-state complete-state]} owner ]
  (reify
    om/IRenderState
    (render-state [this {:keys [span-class icon-class hidden-text on-action]}]
                  (dom/span #js {:className span-class}
                            (dom/a #js {:className (str "link-icon glyphicon " icon-class)
                                        :href "#"
                                        :onClick (fn [e]
                                                   (on-action complete-state current-state)
                                                   (.preventDefault e))}
                                   (dom/span #js {:style #js {:display "none"}} hidden-text))))))

(defn menu-bar [{:keys [app current-state]} owner]
  (reify
    om/IRender
    (render [this]
            (let [complete-state    (:complete-state app)
                  is-split          (is-split complete-state)
                  split-screen-icon (om/build menu-icon
                                              {:current-state current-state :complete-state complete-state}
                                              {:state {:span-class "split-link pull-right"
                                                       :icon-class (if-not is-split "fa fa-columns" "glyphicon-remove-circle")
                                                       :hidden-text "split"
                                                       :on-action (fn [complete-state current-state]
                                                                    (om/transact! complete-state #(go-toggle-split % current-state)))}})]
              (dom/header #js {:className "menu-bar"}
                          (dom/div #js {:className "container-fluid"}
                                   (cond
                                     (is-edit current-state)
                                     (let [configured-views  (:configured-views app)
                                           current-view      (current-view current-state configured-views)
                                           back-icon         (om/build menu-icon
                                                                       {:current-state current-state :complete-state complete-state}
                                                                       {:state {:span-class "back-link pull-left"
                                                                                :icon-class "glyphicon-home"
                                                                                :hidden-text "back"
                                                                                :on-action (fn [_ current-state]
                                                                                             (om/transact! current-state #(go-home %)))}})]
                                       (dom/div nil
                                                back-icon
                                                (dom/span nil
                                                          (if-not is-split (dom/div #js {:className "bold"} "Your current board")
                                                            (dom/div nil
                                                                     (dom/div #js {:className "bold title-split-1"} "Your left board")
                                                                     (dom/div #js {:className "bold title-split-2"} "Your right board")))
                                                          (dom/div #js {:className "thin"} (str "saved "
                                                                                                (display-time (:last-updated current-view)))))
                                                split-screen-icon))
                                     (is-home current-state)
                                     (dom/div nil
                                              (dom/span #js {:className "text-middle bold"}
                                                        (if-not is-split "You've got Time for Coffee!"
                                                          (dom/div nil
                                                                   (dom/div #js {:className "title-split-1"} "Your left board")
                                                                   (dom/div #js {:className "title-split-2"} "Your right board"))))
                                              split-screen-icon))))))))

(defn strong [text]
  (dom/span #js {:className "thin"} text))

(defn welcome-banner [_ owner]
  (reify
    om/IRender
    (render [this]
            (dom/h1 #js {:className "ultra-thin welcome-banner text-center"}
                    (dom/div nil
                             "Relax and don't wait at the stop for your next "
                             (strong "bus")   " " (om/build transport-icon "bus")   ", "
                             (strong "tram")  " " (om/build transport-icon "tram")  ", "
                             (strong "train") " " (om/build transport-icon "train") ", "
                             (strong "boat")  " " (om/build transport-icon "boat")  " or "
                             (strong "cable car") " " (om/build transport-icon "cable-car") ".")
                    (dom/div nil "Enter any stop in "
                             (dom/div #js {:className "phoca-flagbox"}
                                      (dom/span #js {:className "phoca-flag ch"} nil) )
                             " to get started.")))))

(defn stationboard [{:keys [current-state app]} owner]
  "Takes the app (contains all views, selected view) and renders the whole page, knows what to display based on the routing."
  (reify
    om/IRender
    (render [this]
            ; those all depend on the screen that's displayed
            (let [configured-views (:configured-views app)
                  complete-state   (:complete-state app)
                  current-view     (current-view current-state configured-views)
                  display          (:display (:params current-state))
                  activity         (:activity (:params current-state))
                  recent-views     (get-recent-board-views configured-views complete-state)
                  display-banner   (and (is-home current-state) (not (is-split complete-state)))]

              (println "Rendering stationboard with state " current-state)
              (dom/div (clj->js {:className
                                 (str (when-not (:visible current-state) "hidden") " "
                                      (when (= display :expanded) "display-expanded") " "
                                      (when (= activity :idle)    "activity-idle") " "
                                      (name (:state-id current-state)))})

                       (om/build menu-bar {:app app :current-state current-state})
                       (dom/div #js {:className "container-fluid"}
                                (dom/div #js {:className (str "responsive-display " (when-not display-banner "hidden"))}
                                         (om/build welcome-banner nil))
                                (om/build edit-pane {:app app :current-state current-state})
                                (cond
                                  (is-home current-state)
                                  (dom/div #js {:className (str "responsive-display " (when (empty? recent-views) "hidden"))}
                                           (om/build recent-boards {:app app :current-state current-state}))
                                  (is-edit current-state)
                                  (dom/div #js {:className "responsive-display"}
                                           (om/build stop-heading current-view)
                                           (om/build arrival-tables-view {:current-view current-view :current-state current-state})))))))))

(defn split-stationboard [{:keys [complete-state] :as app} owner]
  (reify
    om/IRender
    (render [this]
            (let [states (get-all-states complete-state)
                  order  (:order complete-state )]
              (println "Rendering split stationboard with states " states)
              (apply dom/div (when (is-split complete-state)
                               (clj->js {:className (str "split-board " (name (get order 0)) "-" (name (get order 1)))}))
                     (map #(om/build stationboard {:current-state % :app app}) states))))))

(defn main []
  (let [saved-state     (or (try (reader/read-string (. js/localStorage (getItem "views"))) (catch :default e (println e) {})) {})
        saved-app-state (swap! app-state deep-merge saved-state)]
    (println app-state)
    (om/root split-stationboard saved-app-state
             {:target (. js/document (getElementById "my-app"))
              :tx-listen (fn [{:keys [path new-state]} _]
                           (. js/localStorage (setItem "views"
                                                       ; here if we don't dissoc the page will reload in the current state
                                                       (pr-str new-state))))})))
