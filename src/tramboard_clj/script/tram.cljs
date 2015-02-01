(ns tramboard-clj.script.tram
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [ajax.core :refer [GET POST]]
            [cljs.core.async :refer [put! chan <! close! timeout]]
            [clojure.string :as str]
            [clojure.set :refer [difference]]
            [cljs-time.core :refer [minute hour in-minutes interval now after? minus weeks within? days]]
            [cljs-time.format :refer [parse unparse formatters formatter show-formatters]]
            [cljs-time.coerce :refer [to-long from-long]]
            [secretary.core :as secretary :include-macros true :refer-macros [defroute]]
            [goog.events :as events]
            [cljs-uuid.core :as uuid]
            [arosequist.om-autocomplete :as ac]
            [arosequist.om-autocomplete.bootstrap :as ac-bootstrap]
            [cljs.reader :as reader])

  (:import [goog.net XhrIo]))

(enable-console-print!)

; some global constants here
(def refresh-rate 10000)

; our initial app state
(defonce app-state
  (atom {
         ; views from local storage
         :configured-views (array-map)
         ; navigation state
         :complete-state {:split-states {:state-1 {:state-id :state-1 :state :home :params {} :rendered true} :state-2 {:state-id :state-2 :state :home :params {} :rendered false}}
                          :order [:state-1 :state-2]}}))

(defn uuid [] (str (uuid/make-random)))

(defn cap [string x letter]
  (if (= 0 (- x (count string))) string (cap (str letter string) x letter)))

(defn display-in-minutes [in-minutes]
  (if (< in-minutes 59) in-minutes ">59"))


(def hour-minute-formatter (formatter "HH:mm"))
(def date-formatter (formatter "d MMM yyyy"))
(def only-day-formatter (formatter "EEEE"))

(defn is-within [datetime from length]
  (within? (interval (minus from length) from) datetime))

; TODO memoize this
(defn parse-from-date-time [unparsed-date]
  (parse (formatters :date-time) unparsed-date))

; TODO memoize this with "from" and "timestamp" being a timestamp with minute precision
(defn minutes-from [timestamp from]
  (if (after? from timestamp)
    (- (in-minutes (interval timestamp from)))
    (in-minutes (interval from timestamp))))

; TODO memoize this with "timestamp" being a timestamp with minute precision
(defn format-to-hour-minute [timestamp]
  (unparse hour-minute-formatter timestamp))

; TODO memoize this with "timestamp" being a timestamp with minute precision
(defn display-time [timestamp]
  "Unpure function that decides how this should be displayed depending on the current day"
  (let [now                (now)
        datetime           (from-long timestamp)
        date-format        (unparse date-formatter datetime)
        hour-minute-format (unparse hour-minute-formatter datetime)
        is-today           (= date-format (unparse date-formatter now))
        is-within-a-week   (is-within datetime now (weeks 1))
        is-yesterday       (is-within datetime now (days 1))
        display-time       (str
                             (if is-today "today"
                               (if is-yesterday "yesterday"
                                 (if is-within-a-week (str "last " (unparse only-day-formatter datetime))
                                   (str " on " date-format))))
                             " at " hour-minute-format)]
    display-time))

;(def display-time (memoize display-time-no-cache))

(defn get-view-id [app]
  (->> app
       (:current-state)
       (:params)
       (:view-id)))

(defn current-view [current-state configured-views]
  (let [view-id (:view-id (:params current-state))]
    (get configured-views view-id)))

(defn update-updated-date [view]
  (assoc view :last-updated (to-long (now))))

(defn get-stops-in-order [view]
  (map #(get (:stops view) %) (:stops-order view)))

(defn get-destinations-not-excluded [stop]
  (difference (:known-destinations stop) (:excluded-destinations stop)))

(defn remove-stop-and-update-date [current-view stop-id]
  (let [new-stops        (dissoc (:stops current-view) stop-id)
        new-stops-order  (vec (remove #(= stop-id %) (:stops-order current-view)))
        new-current-view (update-updated-date (assoc current-view
                                                :stops new-stops
                                                :stops-order new-stops-order))]
    new-current-view))

(defn add-stop-and-update-date [current-view {:keys [:id] :as stop}]
  (let [existing-stops       (:stops current-view)
        existing-stops-order (or (:stops-order current-view) [])
        existing-stop        (get existing-stops id)
        new-stops            (assoc existing-stops id (merge (or existing-stop {}) stop))
        new-stops-order      (if-not existing-stop (conj existing-stops-order id) existing-stops-order)
        new-current-view     (update-updated-date (assoc current-view
                                                    :stops new-stops
                                                    :stops-order new-stops-order))]
    new-current-view))

(defn delete-view-if-no-stops [configured-views view-id]
  (let [current-view  (get configured-views view-id)
        current-stops (:stops current-view)]
    (if (empty? current-stops)
      ; we dissoc the current view and set the state to home
      (dissoc configured-views view-id)
      configured-views)))

(defn get-state [complete-state state-id]
  (get (:split-states complete-state) state-id))

(defn is-home [state]
  (= :home (:state state)))

(defn is-edit [state]
  (= :edit (:state state)))

(defn is-split [complete-state]
  (let [split-states (:split-states complete-state)
        state-1      (get split-states :state-1)
        state-2      (get split-states :state-2)]
  (and (:rendered state-1) (:rendered state-2))))

(defn go-home [state]
  (assoc state :state :home :params {}))

(defn go-edit [state view-id]
  (assoc state :state :edit :params {:view-id view-id}))

(defn go-hide [state]
  (go-home (assoc state :rendered false)))

(defn go-show [state]
  (assoc state :rendered true))

(defn get-other-state [complete-state state]
  (let [state-1          (get-state complete-state :state-1)
        state-2          (get-state complete-state :state-2)
        state-id         (:state-id state)
        other-state      (if (= state-id :state-1) state-2 state-1)]
    other-state))

(defn go-toggle-split [complete-state state]
  (let [state-to-toggle    state
        other-state        (get-other-state complete-state state)
        is-split           (is-split complete-state)
        new-complete-state (if is-split
                             (assoc-in complete-state [:split-states (:state-id state-to-toggle)] (go-hide state-to-toggle))
                             (assoc (assoc-in complete-state [:split-states (:state-id other-state)] (go-show other-state))
                               :order [(:state-id state-to-toggle) (:state-id other-state)]))]
    new-complete-state))

(defn modify-complete-state [complete-state current-state fun]
  (let [state-id           (:state-id current-state)
        new-current-state  (fun current-state)
        replace-state      (fn [complete-state current-state]
                             (assoc-in complete-state [:split-states state-id] new-current-state))
        new-complete-state (replace-state complete-state new-current-state)]
    new-complete-state))

(defn get-current-states [complete-state]
  (let [split-states (:split-states complete-state)
        state-1      (get split-states :state-1)
        state-2      (get split-states :state-2)]
    [state-1 state-2]))

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
            (assoc app :configured-views new-configured-views :complete-state new-complete-state)))))

(defn fetch-suggestions [value suggestions-ch cancel-ch]
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
        (.send xhr (str "http://tramboard.herokuapp.com/stations/" value) "GET")))
    (go
      (<! cancel-ch)
      (do
        (put! abort-chan true)
        (.abort xhr)))))

(defn fetch-stationboard-data [stop-id complete-ch error-ch cancel-ch]
  (let [xhr (XhrIo.)]
    (.setTimeoutInterval xhr 10000)
    (goog.events/listen
      xhr goog.net.EventType.SUCCESS
      (fn [e] (put! complete-ch {:stop-id stop-id :data (:departures (js->clj (.getResponseJson xhr) :keywordize-keys true))})))
    (goog.events/listen
      xhr goog.net.EventType.ERROR
      (fn [e] (put! error-ch {:stop-id stop-id :data [] :error (.getLastError xhr)})))
    (.send xhr (str "/stationboard/" stop-id) "GET")
    (go
      (<! cancel-ch)
      (.abort xhr))))

; TODO refactor this part, this should be done in "fetch-stationboard-data" so
; that we get a unified data structure in the code here
(defn arrivals-from-station-data [station-data current-view]
  (->>  station-data
       (map (fn [station-data-entry] (map #(assoc % :stop-id (key station-data-entry)) (val station-data-entry))))
       (flatten)
       (sort-by :departure)
       (map
         (fn [entry]
           (let [scheduled-departure (:scheduled (:departure entry))
                 ; TODO show something if we don't have realtime infos
                 realtime-departure  (or (:realtime (:departure entry)) scheduled-departure)
                 departure-timestamp (parse-from-date-time realtime-departure)
                 now                 (now)]
             {:stop-id
              (:stop-id entry)
              :name
              (:name entry)
              :to
              (:to entry)
              :in-minutes
              (minutes-from departure-timestamp now)
              :time
              (format-to-hour-minute departure-timestamp)
              :undelayed-time
              (when (not= realtime-departure scheduled-departure)
                (let [scheduled-departure-timestamp (parse-from-date-time scheduled-departure)]
                  (format-to-hour-minute scheduled-departure-timestamp)))})))
       ; we filter out the things we don't want to see
       (remove
         #(contains? (:excluded-destinations (get (:stops current-view) (:stop-id %)))
                     ; the entry that corresponds to the destination
                     {:to (:to %) :name (:name %)}))
       (take 30)))


(defn exclude-destination-link [{:keys [arrival current-view]} owner]
  (reify
    om/IRender
    (render [this]
            (let [stop-id     (:stop-id arrival)
                  number      (:name arrival)
                  destination (:to arrival)]
              (dom/a #js {:href "#"
                          :className "link-icon"
                          :title "Exclude destination"
                          :onClick (fn [e]
                                     (om/transact! current-view
                                                   ; TODO put this in a function
                                                   (fn [view]
                                                     ; we add the filter
                                                     (let [stop                           (get (:stops current-view) stop-id)
                                                           existing-excluded-destinations (or (:excluded-destinations stop) #{})
                                                           new-current-view               (update-updated-date
                                                                                            (assoc-in view
                                                                                                      [:stops stop-id :excluded-destinations]
                                                                                                      (conj existing-excluded-destinations {:to destination :name number})))]
                                                       new-current-view)))
                                     (.preventDefault e))}
                     (dom/span #js {:style #js {:display "none"}} "(exclude from view)") "✖")))))

(defn number-icon [number owner]
  (reify
    om/IRender
    (render [this]
            (let [big     (>= (count number) 3)
                  too-big (>= (count number) 5)]
              (dom/span #js {:className (str "bold number-generic number-" number (when big " number-big"))}
                        (if too-big (apply str (take 4 number)) number))))))

(defn arrival-row [{:keys [arrival current-view current-state] :as app} owner]
  (reify
    om/IWillMount
    (will-mount [_]
                ; (println "Mounting row")
                )
    om/IRender
    (render [this]
            ; (println "Rendering row")
            (let []
              (dom/tr #js {:className "tram-row"}
                      (dom/td #js {:className "number-cell"} (om/build number-icon (:name arrival)))
                      (dom/td #js {:className "station"}
                              (dom/span #js {:className "exclude-link"} (om/build exclude-destination-link app))
                              (dom/span #js {:className "station-name"} (:to arrival)))
                      (dom/td #js {:className "departure thin"}
                              (dom/div nil (:time arrival))
                              (dom/div #js {:className "undelayed"} (:undelayed-time arrival)))
                      (let [display-in-minutes  (display-in-minutes (:in-minutes arrival))]
                        (dom/td #js {:className (str "text-right time time" (:in-minutes arrival))}
                                (dom/img #js {:src "images/tram.png"}
                                         (dom/div #js {:className "bold pull-right"} display-in-minutes)))))))))

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
                       (when (not (empty? excluded-destinations))
                         (dom/a #js {:href "#"
                                     :className "remove-filter link-icon"
                                     :onClick (fn [e]
                                                (.preventDefault e)
                                                (om/transact! current-view
                                                              ; TODO put this in a function
                                                              (fn [view]
                                                                ; we remove all the filters
                                                                (let [stops            (:stops view)
                                                                      new-stops-vector (map
                                                                                         #(vector (first %) (dissoc (second %) :excluded-destinations))
                                                                                         stops)
                                                                      new-current-view (update-updated-date (assoc view :stops (apply assoc stops (flatten new-stops-vector))))]
                                                                  new-current-view))))}
                                (dom/span #js {:className "remove-filter-image"} "✖") (dom/span #js {:className "remove-filter-text"} "remove filters")))
                       ;(when (not ))
                       )))))

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
                                    old-cancel-ch         (:cancel-ch old-arrival-channels)
                                    old-incoming-ch       (:incoming-ch old-arrival-channels)
                                    old-fetch-ch          (:fetch-ch old-arrival-channels)
                                    new-cancel-ch         (chan)
                                    new-incoming-ch       (chan)
                                    new-fetch-ch          (chan)]
                                (when old-cancel-ch (close! old-cancel-ch))
                                (when old-incoming-ch (close! old-incoming-ch))
                                (when old-fetch-ch (close! old-fetch-ch))
                                ; we initialize the incoming channel loop
                                (go
                                  (loop []
                                    (when-some
                                      [{:keys [data stop-id error]} (<! new-incoming-ch)]
                                      (println (str "Received data for stop: " stop-id))

                                      (when (not error)
                                        (om/update-state! owner :station-data #(assoc % stop-id data))
                                        ; we update the list of existing destinations
                                        (om/transact! current-view [:stops stop-id]
                                                      (fn [stop]
                                                        ; we add all the known destinations to the stop
                                                        (let [existing-known-destinations (or (:known-destinations stop) #{})
                                                              new-known-destinations      (map #(select-keys % [:to :name]) data)]
                                                          (assoc stop
                                                            :known-destinations
                                                            (into existing-known-destinations new-known-destinations))))))
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
                          (recur)))))
                  (println (str "Initializing on WillMount"))
                  (initialize current-view owner))
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
                                      (when preventDefault (.preventDefault e)))]

                      (println "Rendering arrival table")

                      (dom/div #js {:onMouseMove #(on-action true %)
                                    :onClick #(on-action true %)
                                    :onTouchStart #(on-action false %)}
                               (om/build control-bar {:current-state current-state :current-view current-view} {:init-state {:activity-ch activity-ch}})
                               (om/build arrival-table {:arrivals arrivals :current-view current-view :current-state current-state})))))))

(defn loading [_ owner]
  (reify
    om/IRender
    (render [_]
            (dom/li nil (dom/a nil "Loading...")))))

(defn autocomplete [{:keys [app current-state]} owner {:keys [input-id input-placeholder input-focus-ch backspace-ch]}]
  (reify
    om/IInitState
    (init-state [_]
                {:result-ch (chan)})
    om/IWillMount
    (will-mount [_]
                (let [result-ch (om/get-state owner :result-ch)]
                  (go (loop []
                        (let [[idx result] (<! result-ch)]
                          (when (not (nil? result)) (transact-add-stop app current-state result))
                          (recur))))))
    om/IRenderState
    (render-state [_ {:keys [result-ch]}]
                  (om/build ac/autocomplete {}
                            {:opts
                             {:container-view ac-bootstrap/container-view
                              :container-view-opts {}
                              :input-view ac-bootstrap/input-view
                              :input-view-opts {:placeholder input-placeholder :id input-id}
                              ; TODO merge those 2 in a input-view-init-state maybe ?
                              :input-focus-ch input-focus-ch
                              :backspace-ch backspace-ch
                              :results-view ac-bootstrap/results-view
                              :results-view-opts {:loading-view loading
                                                  :render-item ac-bootstrap/render-item
                                                  :render-item-opts {:text-fn (fn [item _] (:name item))}}
                              :result-ch result-ch
                              :suggestions-fn fetch-suggestions}}))))

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

  (reify
    om/IInitState
    (init-state [_]
                {:input-focus-ch (chan) :backspace-ch (chan)})
    om/IWillMount
    (will-mount  [_]
                ; this does not look good because it removes the placeholder text
                ;(go (put! (om/get-state owner :input-focus-ch) true))

                (let [backspace-ch (om/get-state owner :backspace-ch)]
                  (go
                    (loop []
                      (println "LISTENING")
                      (when-some
                        [backspace (<! backspace-ch)]
                        (when (not (nil? backspace)) (transact-remove-stop app current-state nil))
                        (recur))))))
    om/IWillUnmount
    (will-unmount [_]
                  (let [{:keys [input-focus-ch backspace-ch]} (om/get-state owner)]
                    (close! input-focus-ch)
                    (close! backspace-ch)))
    om/IRenderState
    (render-state [_ {:keys [input-focus-ch backspace-ch]}]
                  (let [configured-views (:configured-views app)
                        current-view     (current-view current-state configured-views)]

                    (println "Rendering edit-pane with state " current-state)
                    (println current-state)

                    (dom/form #js {:className "edit-form"}
                              (dom/div #js {:className "form-group form-group-lg"}
                                       (dom/label #js {:className "control-label sr-only" :htmlFor "stopInput"} "Stop")
                                       (let [on-action (fn [preventDefault e]
                                                         (put! input-focus-ch true)
                                                         (when preventDefault (.preventDefault e)))]
                                         (dom/span #js {:className "form-control thin"
                                                        :onClick #(on-action true %)
                                                        :onTouchStart #(on-action false %)}
                                                   ; TODO transform this into a list of buttons with li+ul
                                                   (apply dom/span nil (map #(om/build edit-remove-button {:app app :current-stop % :configured-views configured-views :current-state current-state}) (get-stops-in-order current-view)))
                                                   (om/build autocomplete {:app app :configured-views configured-views :current-state current-state}
                                                             {:opts {:input-id "stopInput"
                                                                     :input-placeholder "Enter a stop"
                                                                     :input-focus-ch input-focus-ch
                                                                     :backspace-ch backspace-ch}})))))))))

(defn recent-board-item-stop [stop owner]
  (reify
    om/IRender
    (render [this]
            (dom/li nil (:name stop)))))

(defn recent-board-item-number [number owner]
  (reify
    om/IRender
    (render [this]
            (dom/li nil
                    (om/build number-icon number)))))

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
                                                                (map :name)
                                                                (distinct)
                                                                (sort-by #(cap % 20 "0")))
                                           too-big         (> (count numbers) 10)
                                           numbers-to-show (if too-big (conj (vec (take 9 numbers)) "...") numbers)]
                                       (apply dom/ul #js {:className "list-inline"} (om/build-all recent-board-item-number numbers-to-show)))))))))

(defn recent-boards [{:keys [configured-views current-state]} owner]
  (reify
    om/IRender
    (render [this]
            (apply dom/div #js {:className "responsive-display"}
                   (dom/div #js {:className "heading"}
                            (dom/h1 #js {:className "heading thin"} "Your recent boards"))
                   (map #(om/build recent-board-item {:configured-view % :current-state current-state}) (map #(val %) configured-views))))))

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
                                                       :icon-class (if-not is-split "glyphicon-expand" "glyphicon-remove-circle")
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
                                                                                :icon-class "glyphicon-arrow-left"
                                                                                :hidden-text "back"
                                                                                :on-action (fn [_ current-state]
                                                                                             (om/transact! current-state #(go-home %)))}})]
                                       (dom/div nil
                                                back-icon
                                                (dom/span nil
                                                          (dom/div #js {:className "bold"} "Your current board")
                                                          (dom/div #js {:className "thin"} (str "saved "
                                                                                                (display-time (:last-updated current-view)))))
                                                split-screen-icon))
                                     (is-home current-state)
                                     (dom/div nil
                                              (dom/span #js {:className "text-middle bold"}
                                                        (if-not is-split "Welcome to <app name>"
                                                          (dom/div nil
                                                                   (dom/div #js {:className "title-split-1"} "Your left board")
                                                                   (dom/div #js {:className "title-split-2"} "Your right board"))))
                                              split-screen-icon))))))))

(defn stationboard [{:keys [current-state app]} owner]
  "Takes the app (contains all views, selected view) and renders the whole page, knows what to display based on the routing."
  (reify
    om/IRender
    (render [this]
            ; those all depend on the screen that's displayed
            (let [configured-views (:configured-views app)
                  current-view     (current-view current-state configured-views)
                  display          (:display (:params current-state))
                  activity         (:activity (:params current-state))]

              (println "Rendering stationboard with state " current-state)
              (dom/div (clj->js {:className
                                 (str (when (= display :expanded) "display-expanded") " "
                                      (when (= activity :idle)    "activity-idle") " "
                                      (when-not (:rendered current-state) "hidden") " "
                                      (name (:state-id current-state)))})

                       (om/build menu-bar {:app app :current-state current-state})
                       (dom/div #js {:className "container-fluid"}
                                ; this one needs the whole app
                                (om/build edit-pane {:app app :current-state current-state})
                                (cond
                                  (is-home current-state)
                                  (when (not (empty? configured-views))
                                    (om/build recent-boards {:current-state current-state :configured-views configured-views}))
                                  (is-edit current-state)
                                  (dom/div #js {:className "responsive-display"}
                                           (om/build stop-heading current-view)
                                           (om/build arrival-tables-view {:current-view current-view :current-state current-state})))))))))

(defn split-stationboard [{:keys [complete-state] :as app} owner]
  (reify
    om/IRender
    (render [this]
            (let [states (get-current-states complete-state)
                  order  (:order complete-state )]
              (println "Rendering split stationboard with states " states)
              (apply dom/div (when (is-split complete-state)
                               (clj->js {:className (str "split-board " (name (get order 0)) "-" (name (get order 1)))}))
                     (map #(om/build stationboard {:current-state % :app app}) states))))))

(defn main []
  (let [saved-state     (try (reader/read-string (. js/localStorage (getItem "views"))) (catch :default e (println e) {}))
        saved-app-state (swap! app-state merge saved-state)]
    (println saved-app-state)
    (om/root split-stationboard saved-app-state
             {:target (. js/document (getElementById "my-app"))
              :tx-listen (fn [{:keys [path new-state]} _]
                           (. js/localStorage (setItem "views"
                                                       ; here if we don't dissoc the page will reload in the current state
                                                       (pr-str new-state))))})))
