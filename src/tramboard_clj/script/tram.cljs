(ns tramboard-clj.script.tram
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [ajax.core :refer [GET POST]]
            [cljs.core.async :refer [put! chan <! close! timeout]]
            [cljs-time.core :refer [minute hour in-minutes interval now after?]]
            [cljs-time.format :refer [parse unparse formatters formatter]]))

(enable-console-print!)

(def app-state
  (atom 
    {:selected-views [
      {:stations [{:keywords "" :stat {:name "Zürich, Hirschwiesenstrasse" :id "008591193"}}
                  {:keywords "" :stat {:name "Zürich, Milchbuck"           :id "008591276"}}] 
       :name "Hirschi-City" 
       :id "hirschi-city"}]}))


(def mocks
  {:arrivals
   [[
     {:number "14" :destination "Triemli" :in-minutes 0 :time "14:40" :undelayed-time "14:39"}
     {:number "14" :destination "Triemli" :in-minutes 1 :time "14:40" :undelayed-time "14:39"}
     {:number "14" :destination "Triemli" :in-minutes 3 :time "14:40" :undelayed-time "14:39"}]
    [
     {:number "14" :destination "Triemli" :in-minutes 10 :time "14:40" :undelayed-time "14:39"}
     {:number "14" :destination "Triemli" :in-minutes 1 :time "14:40" :undelayed-time "14:39"}
     {:number "14" :destination "Triemli" :in-minutes 1 :time "14:40" :undelayed-time "14:39"}]]
   :views [
           {:stations [{:keywords "" :stat {:name "Zürich, Hirschwiesenstrasse" :id "008591193"}}
                       {:keywords "" :stat {:name "Zürich, Milchbuck"           :id "008591276"}}] 
            :name "Hirschi-City" 
            :id "hirschi-city"}
           ]})


(defn display-time [in-minutes]
  (if (< in-minutes 59) in-minutes ">59"))

(defn arrival-row [arrival owner]
  (reify
    om/IRender
    (render [this] 
      (println arrival)
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


(defn fetch-stationboard-data [id on-complete]
  "Given a list of ids, returns the stationboard data from the server"
  (GET (str "http://localhost:8000/stationboard/" id) {:response-format :json
                                                       :keywords? true 
                                                       :handler (fn [data] (on-complete {:id id :data data}))}))

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
          (fn [entry] {
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
        (list)))

(defn ids-from-views [views] 
  (->> views
    (map :stations)
    (flatten)
    (map :stat)
    (map :id))
  )

(defn execute-and-put-on-channel-after-timeout [fetch channel timeout-ms] 
  (go (<! (timeout timeout-ms)) (fetch #(put! channel %))))

(defn arrival-tables-view [app-state owner]
  "Takes as input a set of views (station id) and the size of the pane and renders the table views."
  (reify
    om/IInitState 
    (init-state [_] 
                ;{:arrivals mocks :window-size 0})
                {:station-data {} :arrivals [] :window-size [] :data-chan (chan)})
    om/IWillMount 
    (will-mount [_]
                ; we start the requests to get the arrival data
                (let [data-chan (om/get-state owner :data-chan)]
                  (go 
                    (loop []
                      (when-some [data (<! data-chan)]
                        (om/update-state! owner :station-data (fn [station-data] (assoc-in station-data [(:id data)] (:data data))))
                        (om/set-state! owner :arrivals (arrivals-from-station-data (om/get-state owner :station-data) (:selected-views app-state) nil))
                        ; we re-fetch the data in 10 seconds
                        (execute-and-put-on-channel-after-timeout (partial fetch-stationboard-data (:id data)) data-chan 10000)
                      (recur))))
                  ; we initialize the refresh loop
                  (doseq
                    [id (ids-from-views (:selected-views app-state))]
                    (execute-and-put-on-channel-after-timeout (partial fetch-stationboard-data id) data-chan 0))))

    om/IWillUnmount
    (will-unmount [_]
      ; we kill the channel
      (close! (om/get-state owner :data-chan)))
    om/IRenderState
    (render-state [this {:keys [arrivals]}]
                  (apply dom/div #js {:className "row"} 
                         (map #(dom/div #js {:className "multi-col col-sm-6 col-md-6"} %)
                              (om/build-all arrival-table arrivals))))))

(defn main []
  (om/root arrival-tables-view app-state
           {:target (. js/document (getElementById "my-app"))}))

