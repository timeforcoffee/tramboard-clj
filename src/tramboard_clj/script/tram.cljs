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
            [cljs-uuid.core :as uuid])
  
  (:import goog.History))

(enable-console-print!)
(secretary/set-config! :prefix "#")

; ; TODO delete those when done
; (def mocks
;   {:views
;    [{:stations [{:keywords "" :stat {:name "Zürich, Hirschwiesenstrasse" :id "008591193"}}
;                 {:keywords "" :stat {:name "Zürich, Milchbuck"           :id "008591276"}}] 
;      :name "Hirschi-City" 
;      :id "hirschi-city"}
;     ]
;    :additional-views 
;    [{:stations [{:keywords "" :stat {:name "Zürich, Hirschwiesenstrasse" :id "008591194"}}
;                 {:keywords "" :stat {:name "Zürich, Milchbuck"           :id "008591275"}}] 
;      :name "Hirschi-City" 
;      :id "hirschi-city"}]})

; some global constants here
(def history (History.))
(def refresh-rate 10000)

; our app state
(def app-state
  (atom {
         ; views from local storage
         :selected-views-ids   []
         :configured-views []
         ; navigation state
         :navigation {}}))

(def home-link "/home")

(defroute home home-link []  
  ; we change the navigation settings
  (swap! app-state #(assoc % :selected-views-ids [])))

(defroute view "/view/*ids" [ids]
  (if 
    (str/blank? ids) 
    (doto history (.setToken home-link))
    ; we change the navigation settings
    (swap! app-state #(assoc % :selected-views-ids (str/split ids "/")))))

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


(defn fetch-stationboard-data [id on-complete on-error]
  "Given a list of ids, returns the stationboard data from the server"
  (GET (str "http://localhost:8000/stationboard/" id) {:response-format :json
                                                       :keywords? true 
                                                       ; :timeout 20
                                                       :handler (fn [data] (on-complete {:id id :data data}))
                                                       :error-handler (fn [error] (on-error {:id id :data [] :error error}))}))

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

(defn station-ids-from-views [views] 
  (->> views
       (map :stations)
       (flatten)
       (map :stat)
       (map :id)
       (set))
  )

(defn views-from-ids [ids views]
  (->> ids
       (map (fn [id] (first (filter #(= (:id %) id) views))))))

(defn arrival-tables-view [app owner]
  "Takes as input a set of views (station id) and the size of the pane and renders the table views."
  (reify
    om/IInitState 
    (init-state [_] 
                {:station-data {} :ids #{} :control-chan (chan) :seq-id 0})
    om/IWillMount 
    (will-mount [_]
                ; the is the control channel loop
                (let [control-chan (om/get-state owner :control-chan)]
                  (go
                    (loop []
                      (when-some 
                        [control (<! control-chan)]
                        (let [key (:key control) 
                              data (:data control) 
                              msg-seq-id (:seq-id control) 
                              current-seq-id (om/get-state owner :seq-id)]
                          (println (str "Got channel message with: " key ", " (str (apply str (take 100 (str data))) "...")))
                          
                          (case key
                            "view-change"
                            ; we reset everything in a transaction
                            (do
                              (println (str "Setting up refresh loop for: " data))
                              
                              (let [new-seq-id (uuid)]
                                (om/update-state! owner #(merge % {:ids data :station-data {} :seq-id new-seq-id}))
                                ; we ask the channel to fetch the new data
                                (doseq [id data]
                                  (go (<! (timeout 0)) (put! control-chan {:key "fetch" :data id :seq-id new-seq-id})))))
                            "incoming-data"
                            (let [id (:id data) station-data (:data data)]
                              (when (= current-seq-id msg-seq-id)
                                ; here we should never assign to nil otherwise it seems Om does not
                                ; propagate the changes any more
                                (when (not (:error data))
                                  (om/update-state! owner :station-data #(assoc % id station-data)))
                                (go (<! (timeout refresh-rate)) (put! control-chan {:key "fetch" :data id :seq-id msg-seq-id}))))
                            ; (println (om/get-state owner :station-data))
                            "fetch"
                            (let [handle-data #(put! control-chan {:key "incoming-data" :data % :seq-id msg-seq-id})]
                              (fetch-stationboard-data data handle-data handle-data))
                            ))
                        (recur))))))
    om/IWillUnmount
    (will-unmount [_]
                  ; we kill the channel
                  (close! (om/get-state owner :control-chan)))
    om/IWillReceiveProps
    (will-receive-props [_ next]
                        (let [station-ids (station-ids-from-views (views-from-ids (:selected-views-ids next) (:configured-views next)))]
                          (put! (om/get-state owner :control-chan) {:key "view-change" :data station-ids})))
    om/IRenderState
    (render-state [this {:keys [station-data]}]
                  (println "Rendering arrival tables")
                  
                  (let [arrivals (arrivals-from-station-data 
                                   station-data 
                                   (views-from-ids (:selected-views-ids app) (:configured-views app)) nil)]
                    (dom/div nil
                             (apply dom/div #js {:className "row"} 
                                    (map #(dom/div #js {:className "multi-col col-sm-6 col-md-6"} %)
                                         (om/build-all arrival-table arrivals))))))))

(defn create-view-suffix [linked-view-id selected-views-ids]
  "Creates a link based on which views are selected"
  (if (some #{linked-view-id} selected-views-ids)
    (str/join "/" (remove #(= linked-view-id %) selected-views-ids))
    (str/join "/" (conj selected-views-ids linked-view-id))))

(defn menu-item [view-infos owner]
  "This is a link"
  (reify
    om/IRender
    (render [this]            
            (let [linked-view (:configured-view view-infos) 
                  selected-views-ids (:selected-views-ids view-infos)
                  link (create-view-suffix (:id linked-view) selected-views-ids)]
              ; TODO create the link based on what is selected
              (dom/li #js {:className (when (some #{(:id linked-view)} (set selected-views-ids)) "active")}
                      (dom/a #js {:href (view {:ids link})} (:name linked-view)))))))

(defn menu-bar [app owner]
  "This displays all the links"
  (reify 
    om/IRender
    (render [this]
            (apply dom/ul #js {:className "nav nav-pills"}
                   (map  #(om/build menu-item {:configured-view % :selected-views-ids (:selected-views-ids app)})
                        (:configured-views app))))))

(defn stationboard [app owner]
  "Takes the app (contains all views, selected view) and renders the whole page, knows what to display based on the routing."
  (reify
    om/IWillMount
    (will-mount [_]
                ; here we get the infos from local storage and store them in the component state
                (go
                  (om/update! app :configured-views (js->clj (. js/JSON (parse (. js/localStorage (getItem "views")))) :keywordize-keys true))))
    om/IRender
    (render [this]
            (println "Rendering stationboard")
            
            (dom/div nil                     
                     (om/build menu-bar app)
                     (om/build arrival-tables-view app)))))

(defn main []
  (om/root stationboard app-state
           {:target (. js/document (getElementById "my-app"))}))


(defn on-navigate [event]
  ;(refresh-navigation)
  (secretary/dispatch! (.-token event)))

(doto history
  (goog.events/listen EventType/NAVIGATE on-navigate)
  (.setEnabled true))
