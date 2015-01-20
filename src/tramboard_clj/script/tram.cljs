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
         :configured-views []
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

(defn arrival-row [arrival owner]
  (reify
    om/IWillMount 
    (will-mount [_] 
                ; (println "Mounting row")
                )
    om/IRender
    (render [this] 
            ; (println "Rendering row")
            (dom/tr #js {:className "tram-row"}
                    (dom/td #js {:className "number-cell"} (dom/span #js {:className (str "number number-" (:number arrival))} (:number arrival)))
                    (dom/td #js {:className "station"} (:destination arrival))
                    (dom/td #js {:className "departure"} 
                            (dom/div nil (:time arrival))
                            (dom/div #js {:className "undelayed"} (:undelayed-time arrival)))
                    (let [display-time  (display-time (:in-minutes arrival))]
                      (dom/td #js {:className (str "text-right time time" (:in-minutes arrival))}
                              (dom/img #js {:src "images/tram.png"}
                                       (dom/div nil display-time))))))))

(defn arrival-table [arrivals owner]
  (reify
    om/IRender 
    (render [this]
            (dom/table #js {:className "tram-table"} 
                       (apply dom/tbody nil 
                              (om/build-all arrival-row arrivals))))))


; TODO use XhrIo and channels as function parameters error-ch complete-ch cancel-ch
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

(defn arrivals-from-station-data [station-data selected-views window-size]
  ; TODO split it up in columns if window-size is big-e
  (->>  station-data
       (vals)
       (flatten)
       (sort-by :departure)
       (map 
         (fn [entry] 
           {:number 
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
       (list)))

(defn stops-ids-from-view [view] 
  (->> view
       (:stops)
       (map :id)
       (set))
  )

(defn view-from-id [view-id views]
  (first (filter #(= (:view-id %) view-id) views)))

(defn get-view-id [app] 
  (->> app
       (:current-state)
       (:params)
       (:view-id)))

(defn arrival-tables-view [app owner]
  "Takes as input a set of views (station id) and the size of the pane and renders the table views."
  (let [initialize 
        (fn [current owner]  
          (let [stop-ids (stops-ids-from-view (view-from-id (get-view-id current) (:configured-views current)))]
            (println (str "Initializing arrival tables with stops: " stop-ids))
            (when (not (empty? stop-ids)) (put! (om/get-state owner :view-change-ch) stop-ids))))]
    (reify
      om/IInitState 
      (init-state [_] 
                  {:station-data {} :ids #{} :channels {} :view-change-ch (chan)})
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
                              (let [old-channels  (:channels state)
                                    old-cancel-ch (:cancel-ch old-channels)
                                    old-incoming-ch (:incoming-ch old-channels)
                                    old-fetch-ch (:fetch-ch old-channels)
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
                                      (println (str "Received data for stop: " stop-id ", data: " data ", error: " error))
                                      (when (not error)
                                        (om/update-state! owner :station-data #(assoc % stop-id data)))
                                      (go (<! (timeout refresh-rate))
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
                                
                                (assoc (update-in state [:channels]
                                                  #(assoc %
                                                     :incoming-ch new-incoming-ch
                                                     :cancel-ch new-cancel-ch
                                                     :fetch-ch new-fetch-ch))
                                  :ids stop-ids 
                                  :station-data {}))))
                          (println (om/get-state owner))
                          (recur)))))
                  (initialize app owner))
      om/IWillReceiveProps
      (will-receive-props [_ next]
                          (initialize next owner))
      om/IWillUnmount
      (will-unmount [_]
                    ; we kill the channel
                    (let [{:keys [view-change-ch channels]} (om/get-state owner)]
                      (close! (om/get-state owner :view-change-ch))
                      (let [cancel-ch (:cancel-ch channels)
                            incoming-ch (:incoming-ch channels)
                            fetch-ch (:fetch-ch channels)]
                        (when cancel-ch (close! cancel-ch))
                        (when incoming-ch (close! incoming-ch))
                        (when fetch-ch (close! fetch-ch)))))
      om/IRenderState
      (render-state [this {:keys [station-data]}]
                    (let [arrivals (arrivals-from-station-data 
                                     station-data 
                                     (view-from-id (get-view-id app) (:configured-views app)) nil)]
                      (dom/div nil
                               (apply dom/div #js {:className "row"} 
                                      (map #(dom/div #js {:className "multi-col col-sm-12 col-md-12"} %)
                                           (om/build-all arrival-table arrivals)))))))))

(defn create-view-suffix [linked-view-id selected-views-ids]
  "Creates a link based on which views are selected"
  (if (some #{linked-view-id} selected-views-ids)
    (str/join "/" (remove #(= linked-view-id %) selected-views-ids))
    (str/join "/" (conj selected-views-ids linked-view-id))))

(defn stop-item [view owner]
  "This is a link"
  (reify
    om/IRender
    (render [this]            
            (println "Redering link")
            ; TODO create the link based on what is selected
            (dom/li #js {:className ""}
                    (dom/a #js {:href nil} (:name view))))))

(defn stop-bar [app owner]
  "This displays all the links"
  (reify 
    om/IRender
    (render [this]
            (dom/div nil
                     (dom/h3 nil "Trams / buses / trains departing from "
                             (apply dom/ul #js {:className "nav nav-pills inline"}
                                    (map  #(om/build stop-item %) (:stops (view-from-id (get-view-id app) (:configured-views app))))))))))

; (defn transition-state [current-state action]
;   "This moves the application in the correct state after an action, it returns the next :current-state for the app state"

;   )

(defn select-stop [app stop callback]
  (om/transact! app (fn [{:keys [configured-views current-state] :as s}]
                      (let [state (:state current-state)
                            view-id (if (not= state :edit) (uuid) (:view-id (:params current-state)))
                            new-state {:state :edit :params {:view-id view-id}}
                            new-views (if (not= state :edit) 
                                        (conj configured-views {:view-id view-id :stops [stop]}) 
                                        (map #(if 
                                                (= (:view-id %) view-id) 
                                                (assoc % :stops (conj (:stops %) stop)) 
                                                %) 
                                             configured-views))]
                        (assoc s
                          :current-state new-state
                          :configured-views new-views))))
  
  (when callback (callback (:configured-views app))))

(defn loading []
  (reify
    om/IRender
    (render [_]
            (dom/li nil (dom/a nil "Loading...")))))

(defn suggestions [value suggestions-ch cancel-ch]
  (let [xhr (XhrIo.) abort-chan (chan)]
    ; we introduce some timeout here
    (go (<! (timeout 250)) (put! abort-chan false))
    
    (go (when-not (<! abort-chan)
          (goog.events/listen 
            xhr goog.net.EventType.SUCCESS
            (fn [e] (put! suggestions-ch (:stations (js->clj (.getResponseJson xhr) :keywordize-keys true)))))
          (goog.events/listen 
            xhr goog.net.EventType.ERROR
            (fn [e] (println "ERROR")))
          (.send xhr (str "http://transport.opendata.ch/v1/locations?type=station&query=" value) "GET")))
    (go
      (<! cancel-ch) 
      (do (put! abort-chan true) (.abort xhr)))))

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
                          (select-stop app result nil)
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

(defn edit-pane [app owner]
  "This shows the edit pane to add stops and stuff"
  (reify
    om/IRender
    (render [this]
            (dom/form #js {:className "form-horizontal col-md-12"}
                      (dom/div #js {:className "form-group form-group-lg"}
                               (dom/label #js {:className "control-label sr-only" :for "stopInput"} "Stop")
                               (om/build autocomplete app {:opts {:input-id "stopInput" :input-placeholder "Enter a stop"}}))))))


; <label for="exampleInputEmail1">Email address</label>
; <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">

(defn stationboard [app owner]
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
            (println (str "Current state: " (:state (:current-state app))))
            
            (dom/div #js {:className "container"}
                     (dom/div #js {:className "row"}
                              (dom/div #js {:className "col-md-12"}
                                       (om/build edit-pane app)
                                       (om/build stop-bar app)
                                       (om/build arrival-tables-view app)
                                       ))))))

(defn main []
  (om/root stationboard app-state
           {:target (. js/document (getElementById "my-app"))}))


(defn on-navigate [event]
  ;(refresh-navigation)
  (secretary/dispatch! (.-token event)))

(doto history
  (goog.events/listen EventType/NAVIGATE on-navigate)
  (.setEnabled true))
