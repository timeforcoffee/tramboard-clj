(ns tramboard-clj.script.tram
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [ajax.core :refer [GET POST]]
            [cljs.core.async :refer [put! chan <! close! timeout]]
            [clojure.string :as str]
            [cljs-time.core :refer [minute hour in-minutes interval now after?]]
            [cljs-time.format :refer [parse unparse formatters formatter]]
            [secretary.core :as secretary :include-macros true :refer-macros [defroute]]
            [goog.events :as events]
            [goog.history.EventType :as EventType]
            [cljs-uuid.core :as uuid]
            [arosequist.om-autocomplete :as ac]
            [arosequist.om-autocomplete.bootstrap :as ac-bootstrap])

  (:import goog.History
           [goog.net XhrIo]))

(enable-console-print!)
(secretary/set-config! :prefix "#")

; some global constants here
(def history (History.))
(def refresh-rate 10000)

; our app state
(defonce app-state
  (atom {
         ; views from local storage
         :configured-views (array-map)
         ; navigation state
         :current-state {:state :uninitialized :params {}}}))

(def home-link "/home")

(defroute home home-link []
  (println "GOING HOME")
  ; we change the navigation settings
  ; (swap! app-state #(merge % {:current-state {:state :home}}))
  )

; (defroute view "/view/*ids" [ids]
;   (if
;     (str/blank? ids)
;     (doto history (.setToken home-link))
;     ; we change the navigation settings
;     (swap! app-state #(assoc % :selected-views-ids (str/split ids "/")))))

; fallback route will redirect to home
(defroute "*" [] (doto history (.setToken home-link)))

(defn uuid [] (uuid/make-random))

(defn display-time [in-minutes]
  (if (< in-minutes 59) in-minutes ">59"))

(defn exclude-destination-link [{:keys [arrival current-view]} owner]
  (reify
    om/IRender
    (render [this]
            (let [stop-id (:stop-id arrival)
                  destination (:destination arrival)]
              (dom/a #js {:href "#"
                          :className ""
                          :onClick (fn [e]
                                     (.preventDefault e)
                                     (om/transact! current-view [:stops stop-id]
                                                   (fn [stop]
                                                     (let [existing-excluded-destinations (or (:excluded-destinations stop) #{})]
                                                       (assoc stop :excluded-destinations (conj existing-excluded-destinations destination))))))}
                     (dom/span #js {:style #js {:display "none"}} "(exclude from view)") "✖")))))

(defn arrival-row [{:keys [arrival current-view current-state] :as app} owner]
  (reify
    om/IWillMount
    (will-mount [_]
                ; (println "Mounting row")
                )
    om/IRender
    (render [this]
            ; (println "Rendering row")
            (let [display (:display (:params current-state))
                  activity (:activity (:params current-state))]
              (dom/tr #js {:className "tram-row"}
                      (dom/td #js {:className "number-cell"} (dom/span #js {:className (str "number-generic number-" (:number arrival))} (:number arrival)))
                      (when (or (not= :idle activity) (not= :expanded display)) (dom/td #js {:className "exclude-link"} (om/build exclude-destination-link app)))
                      (dom/td #js {:className "station"} (:destination arrival))
                      (dom/td #js {:className "departure"}
                              (dom/div nil (:time arrival))
                              (dom/div #js {:className "undelayed"} (:undelayed-time arrival)))
                      (let [display-time  (display-time (:in-minutes arrival))]
                        (dom/td #js {:className (str "text-right time time" (:in-minutes arrival))}
                                (dom/img #js {:src "images/tram.png"}
                                         (dom/div nil display-time)))))))))

(defn arrival-table [{:keys [arrivals current-view current-state]} owner]
  (reify
    om/IRender
    (render [this]
            (dom/table #js {:className "tram-table"}
                       (apply dom/tbody nil
                              (map #(om/build arrival-row {:arrival % :current-view current-view :current-state current-state}) arrivals))))))


(defn fetch-stationboard-data [stop-id complete-ch error-ch cancel-ch]
  (let [xhr (XhrIo.)]
    (.setTimeoutInterval xhr 10000)
    (goog.events/listen
      xhr goog.net.EventType.SUCCESS
      (fn [e] (put! complete-ch {:stop-id stop-id :data (js->clj (.getResponseJson xhr) :keywordize-keys true)})))
    (goog.events/listen
      xhr goog.net.EventType.ERROR
      (fn [e] (put! error-ch {:stop-id stop-id :data [] :error (.getLastError xhr)})))
    (.send xhr (str "http://localhost:8000/stationboard/" stop-id) "GET")
    (go
      (<! cancel-ch)
      (.abort xhr))))

(def hour-minute-formatter (formatter "HH:mm"))

(defn format-to-datetime [unparsed-date]
  (parse (formatters :date-time-no-ms) unparsed-date))

(defn format-to-hour-minute [unparsed-date]
  (unparse hour-minute-formatter (format-to-datetime unparsed-date)))

(defn arrivals-from-station-data [station-data current-view]
  (->>  station-data
       (map (fn [station-data-entry] (map #(assoc % :stop-id (key station-data-entry)) (val station-data-entry))))
       (flatten)
       (sort-by :departure)
       (map
         (fn [entry]
           {:stop-id
            (:stop-id entry)
            :number
            (:number entry)
            :destination
            (:to entry)
            :in-minutes
            (let [departure (format-to-datetime (:departure entry)) now (now)]
              (if (after? now departure)
                (- (in-minutes (interval departure now)))
                (in-minutes (interval now departure))))
            :time
            (format-to-hour-minute (:departure entry))
            :undelayed-time
            (when (not= (:departure entry) (:undelayed_departure entry))
              (format-to-hour-minute (:undelayed_departure entry)))}))
       ; we filter out the things we don't want to see
       (remove
         #(contains? (:excluded-destinations (get (:stops current-view) (:stop-id %))) (:destination %)))))

(defn get-view-id [app]
  (->> app
       (:current-state)
       (:params)
       (:view-id)))

(defn stop-heading [{:keys [current-view current-state]} owner]
  "This displays all the links"
  (reify
    om/IRender
    (render [this]
            (let [display (get-in current-state [:params :display])]
              (dom/div (when (= :expanded display) #js {:style #js {:display "none"}})
                       (dom/div #js {:className "stop-heading"}
                                (dom/h2 nil "Trams / buses / trains departing from " (str/join " / " (map #(:name (val %)) (:stops current-view))))))))))

(defn menu-bar [{:keys [current-state current-view]} owner]
  (reify
    om/IWillMount
    (will-mount [_]
                (let [{:keys [activity-ch]} (om/get-state owner)]
                  (go
                    (loop []
                      (when-some
                        [activity (<! activity-ch)]
                        ; activity detected, we show the view
                        (om/update-state!
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

                              (assoc s :hide-ch new-hide-ch))))
                        (recur))))))
    om/IWillUnmount
    (will-unmount [this]
                  (let [hide-ch (om/get-state owner :hide-ch)]
                    (when hide-ch (close! hide-ch))))
    om/IRender
    (render [this]
            (let [expanded (= :expanded (:display (:params current-state)))
                  hidden (= :idle (:activity (:params current-state)))
                  excluded-destinations (remove nil? (flatten (map #(:excluded-destinations (val %)) (:stops current-view))))]
              (dom/div (when (and expanded hidden) #js {:style #js {:display "none"}})
                       (dom/div #js {:className "menu-bar"}
                                (dom/a #js {:href "#"
                                            :className (str "glyphicon " (if expanded "glyphicon-resize-small" "glyphicon-resize-full"))
                                            :onClick (fn [e]
                                                       (.preventDefault e)
                                                       ; we change the state to hidden
                                                       (if expanded
                                                         (om/transact! current-state :params #(dissoc % :display ))
                                                         (om/transact! current-state :params #(assoc % :display :expanded))))}
                                       (dom/span #js {:style #js {:display "none"}} "(full screen)"))
                                (when (not (empty? excluded-destinations))
                                  (dom/a #js {:href "#"
                                              :className "remove-filter"
                                              :onClick (fn [e]
                                                         (.preventDefault e)
                                                         (om/transact! current-view
                                                                       :stops
                                                                       (fn [stops]
                                                                         (let [new-stops-vector (map
                                                                                                  #(vector (first %) (dissoc (second %) :excluded-destinations))
                                                                                                  stops)]
                                                                           (apply assoc stops (flatten new-stops-vector))))))}
                                         (dom/span #js {:className "remove-filter-image"} "✖") (dom/span #js {:className "remove-filter-text"} "remove filters")))))))))

(defn arrival-tables-view [{:keys [current-view current-state]} owner]
  "Takes as input a set of views (station id) and the size of the pane and renders the table views."
  (let [initialize
        (fn [current current-owner]
          (let [stop-ids (keys (:stops current))]
            (when (not= (set stop-ids) (set (om/get-state current-owner :ids)))
              (println (str "Initializing arrival tables with stops: " stop-ids))
              (put! (om/get-state current-owner :view-change-ch) stop-ids))))]
    (reify
      om/IInitState
      (init-state [_]
                  (println (str "Resetting state"))
                  {:station-data {} :ids #{} :arrival-channels {} :activity-ch (chan) :view-change-ch (chan)})
      om/IWillMount
      (will-mount [_]
                  ; the is the control channel loop
                  (let [{:keys [view-change-ch]} (om/get-state owner)]
                    (go
                      (loop []
                        (when-some
                          [stop-ids (<! view-change-ch)]
                          (println (str "Got view-change message with stops: " stop-ids))
                          (om/update-state!
                            owner
                            (fn [state]
                              (let [old-arrival-channels  (:arrival-channels state)
                                    old-cancel-ch (:cancel-ch old-arrival-channels)
                                    old-incoming-ch (:incoming-ch old-arrival-channels)
                                    old-fetch-ch (:fetch-ch old-arrival-channels)
                                    new-cancel-ch (chan)
                                    new-incoming-ch (chan)
                                    new-fetch-ch (chan)]
                                (when old-cancel-ch (close! old-cancel-ch))
                                (when old-incoming-ch (close! old-incoming-ch))
                                (when old-fetch-ch (close! old-fetch-ch))
                                ; we initialize the incoming channel loop
                                (go
                                  (loop []
                                    (when-some
                                      [{:keys [data stop-id error]} (<! new-incoming-ch)]
                                      (println (str "Received data for stop: " stop-id ", data: " (take 10 (str data)) ", error: " error))

                                      (when (not error)
                                        (om/update-state! owner :station-data #(assoc % stop-id data))
                                        ; we update the list of existing destinations
                                        (om/transact! current-view [:stops stop-id]
                                                      (fn [stop]
                                                        (let [existing-known-destinations (or (:known-destinations stop) #{})
                                                              new-known-destinations (map :to data)]
                                                          (if (not (every? existing-known-destinations new-known-destinations))
                                                            (assoc stop
                                                              :known-destinations
                                                              (into existing-known-destinations new-known-destinations))
                                                            stop)))))
                                      (go (<! (timeout refresh-rate))
                                          (println (str "Putting onto fetch channel: " stop-id))
                                          (put! new-fetch-ch stop-id))
                                      (recur))))
                                ; we initialize the fetch loop
                                (go
                                  (loop []
                                    (when-some
                                      [stop-id (<! new-fetch-ch)]
                                      (println (str "Received fetch message for stop: " stop-id))
                                      (fetch-stationboard-data stop-id new-incoming-ch new-incoming-ch new-cancel-ch)
                                      (recur))))

                                ; we ask the channel to fetch the new data
                                (doseq [stop-id stop-ids]
                                  (println (str "Initializing fetch loop for: " stop-id))
                                  (put! new-fetch-ch stop-id))

                                (assoc (update-in state [:arrival-channels]
                                                  #(assoc %
                                                     :incoming-ch new-incoming-ch
                                                     :cancel-ch new-cancel-ch
                                                     :fetch-ch new-fetch-ch))
                                  :ids stop-ids
                                  :station-data {}))))
                          (println (om/get-state owner))
                          (recur)))))
                  (println (str "Initializing on WillMount: " (om/get-state owner)))
                  (initialize current-view owner))
      om/IWillReceiveProps
      (will-receive-props [_ {:keys [current-view]}]
                          (println (str "Initializing on WillReceiveProps: " (om/get-state owner)))
                          (initialize current-view owner))
      om/IWillUnmount
      (will-unmount [_]
                    (println "Closing all channels on WillUnmount")
                    ; we kill the channel
                    (let [{:keys [view-change-ch activity-ch arrival-channels]} (om/get-state owner)]
                      (close! view-change-ch)
                      (close! activity-ch)
                      (let [cancel-ch (:cancel-ch arrival-channels)
                            incoming-ch (:incoming-ch arrival-channels)
                            fetch-ch (:fetch-ch arrival-channels)]
                        (when cancel-ch (close! cancel-ch))
                        (when incoming-ch (close! incoming-ch))
                        (when fetch-ch (close! fetch-ch)))))
      om/IRenderState
      (render-state [this {:keys [station-data activity-ch]}]
                    (let [arrivals (arrivals-from-station-data station-data current-view)
                          on-action (fn [e]
                                      (.preventDefault e)
                                      (put! activity-ch true))]
                      (dom/div #js {:onClick on-action
                                    :onMouseMove on-action
                                    :onTouchStart on-action}
                               (om/build menu-bar {:current-state current-state :current-view current-view} {:init-state {:activity-ch activity-ch}})
                               (dom/div nil
                                        (om/build arrival-table {:arrivals arrivals :current-view current-view :current-state current-state}))))))))

;(defn create-view-suffix [linked-view-id selected-views-ids]
;  "Creates a link based on which views are selected"
;  (if (some #{linked-view-id} selected-views-ids)
;    (str/join "/" (remove #(= linked-view-id %) selected-views-ids))
;    (str/join "/" (conj selected-views-ids linked-view-id))))


; (defn transition-state [current-state action]
;   "This moves the application in the correct state after an action, it returns the next :current-state for the app state"

;   )

(defn select-stop [app stop callback]
  (om/transact! app (fn [{:keys [configured-views current-state] :as s}]
                      (let [state (:state current-state)
                            is-new-view (not= state :edit)
                            view-id (if is-new-view (uuid) (:view-id (:params current-state)))
                            stop-id (:id stop)
                            new-state {:state :edit :params {:view-id view-id}}
                            new-views (let [existing-view
                                            (or (get configured-views view-id)
                                                {:view-id view-id :stops (assoc (array-map) (:id stop) stop)})
                                            existing-stops (:stops existing-view)
                                            existing-stop (or (get stop-id existing-stops) {})]
                                        (assoc
                                          configured-views
                                          view-id (assoc existing-view
                                                    :stops (assoc existing-stops stop-id (merge existing-stop stop)))))]
                        (assoc s
                          :current-state new-state
                          :configured-views new-views))))

  (when callback (callback (:configured-views app))))

(defn loading [app owner]
  (reify
    om/IRender
    (render [_]
            (dom/li nil (dom/a nil "Loading...")))))

(defn suggestions [value suggestions-ch cancel-ch]
  (let [xhr (XhrIo.) abort-chan (chan)]
    ; we introduce some timeout here
    (go (<! (timeout 250)) (put! abort-chan false))

    (go
      (when-not (<! abort-chan)
        (goog.events/listen
          xhr goog.net.EventType.SUCCESS
          (fn [e] (put! suggestions-ch (js->clj (.getResponseJson xhr) :keywordize-keys true))))
        (goog.events/listen
          xhr goog.net.EventType.ERROR
          (fn [e] (println "ERROR")))
        (.send xhr (str "http://localhost:8000/stations/" value) "GET")))
    (go
      (<! cancel-ch)
      (do
        (put! abort-chan true)
        (.abort xhr)))))

(defn autocomplete [app owner {:keys [input-id input-placeholder]}]
  (reify
    om/IInitState
    (init-state [_]
                {:result-ch (chan)})
    om/IWillMount
    (will-mount [_]
                (let [result-ch (om/get-state owner :result-ch)]
                  (go (loop []
                        (let [[idx result] (<! result-ch)]
                          ; TODO callback to save to local storage
                          (when (not (nil? result)) (select-stop app result nil))
                          (recur))))))
    om/IRenderState
    (render-state [_ {:keys [result-ch]}]
                  (om/build ac/autocomplete app
                            {:opts
                             {:container-view ac-bootstrap/container-view
                              :container-view-opts {}
                              :input-view ac-bootstrap/input-view
                              :input-view-opts {:placeholder input-placeholder :id input-id}
                              :results-view ac-bootstrap/results-view
                              :results-view-opts {:loading-view loading
                                                  :render-item ac-bootstrap/render-item
                                                  :render-item-opts {:text-fn (fn [item _] (:name item))}}
                              :result-ch result-ch
                              :suggestions-fn suggestions}}))))

(defn edit-remove-button [{:keys [current-stop current-view]} owner]
  (reify
    om/IRender
    (render [this]
            (dom/button #js {:className "btn btn-primary"
                             :type "button"
                             :onClick (fn [e]
                                        (.preventDefault e)
                                        (om/transact! current-view :stops (fn [stops] (dissoc stops (:id current-stop)))))}
                        (:name current-stop)
                        (dom/span #js {:className "glyphicon glyphicon-remove" :aria-hidden "true"})))))

(defn edit-pane [{:keys [current-app current-view]} owner]
  "This shows the edit pane to add stops and stuff"
  (reify
    om/IRender
    (render [this]
            (let [display (get-in current-app [:current-state :params :display])]
              (dom/div (when (= :expanded display) #js {:style #js {:display "none"}})
                       (dom/form #js {:className "edit-form"}
                                 (dom/div #js {:className "form-group form-group-lg"}
                                          (dom/label #js {:className "control-label sr-only" :for "stopInput"} "Stop")
                                          (apply dom/span #js {:className "form-control"}
                                                 (conj
                                                   (vec (map #(om/build edit-remove-button {:current-stop (val %) :current-view current-view}) (:stops current-view)))
                                                   (om/build autocomplete current-app {:opts {:input-id "stopInput" :input-placeholder "Enter a stop"}}))))))))))


; <label for="exampleInputEmail1">Email address</label>
; <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">

(defn stationboard [{:keys [current-state] :as app} owner]
  "Takes the app (contains all views, selected view) and renders the whole page, knows what to display based on the routing."
  (reify
    om/IWillMount
    (will-mount [_]
                ; here we get the infos from local storage and store them in the component state
                ; (go
                ;   (om/update! app :configured-views (js->clj (. js/JSON (parse (. js/localStorage (getItem "views")))) :keywordize-keys true)))
                )
    om/IRender
    (render [this]
            (println "Rendering stationboard")
            (println (str "Current state: " app))

            (let [current-view (get (:configured-views app) (get-view-id app))]
              (apply dom/div #js {:className "container-fluid"}
                     (om/build edit-pane {:current-view current-view :current-app app})
                     (when (not (empty? (:stops current-view)))
                       [(om/build stop-heading {:current-view current-view :current-state current-state})
                        (om/build arrival-tables-view {:current-view current-view :current-state current-state})]))))))

(defn main []
  (om/root stationboard app-state
           {:target (. js/document (getElementById "my-app"))}))


(defn on-navigate [event]
  ;(refresh-navigation)
  (secretary/dispatch! (.-token event)))

(doto history
  (goog.events/listen EventType/NAVIGATE on-navigate)
  (.setEnabled true))
