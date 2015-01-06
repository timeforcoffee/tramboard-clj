(ns tramboard-clj.script.tram
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [ajax.core :refer [GET POST]]))

(enable-console-print!)

(def app-state
  (atom 
    {:selected-views ["hirschi"]}))


(def mocks
  {:arrivals
   [[
     {:number "14" :destination "Triemli" :in-minutes 0 :in-hours 0 :time "14:40" :undelayed-time "14:39"}
     {:number "14" :destination "Triemli" :in-minutes 1 :in-hours 0 :time "14:40" :undelayed-time "14:39"}
     {:number "14" :destination "Triemli" :in-minutes 3 :in-hours 1 :time "14:40" :undelayed-time "14:39"}]
    [
     {:number "14" :destination "Triemli" :in-minutes 10 :in-hours 0 :time "14:40" :undelayed-time "14:39"}
     {:number "14" :destination "Triemli" :in-minutes 1  :in-hours 0 :time "14:40" :undelayed-time "14:39"}
     {:number "14" :destination "Triemli" :in-minutes 1  :in-hours 1 :time "14:40" :undelayed-time "14:39"}]]
   :views [
           {:stations [{:keywords "" :stat {:name "Zürich, Hirschwiesenstrasse" :id "008591193"}}
                       {:keywords "" :stat {:name "Zürich, Milchbuck"           :id "008591276"}}] 
            :name "Hirschi-City" 
            :id "hirschi-city"}
           ]})


(defn display-time [in-hours in-minutes]
  (if (= in-hours 0) in-minutes ">59"))

(defn arrival-row [arrival owner]
  (reify
    om/IRender
    (render [this] 
            (dom/tr #js {:className "tram-row"}
                    (dom/td #js {:className "number-cell"} (dom/span #js {:className (str "number number-" (:number arrival))} (:number arrival)))
                    (dom/td #js {:className "station"} (:destination arrival))
                    (dom/td #js {:className "departure"} 
                            (dom/div nil (:time arrival))
                            (dom/div #js {:className "undelayed"} (:undelayed-time arrival)))
                    (let [display-time  (display-time (:in-hours arrival) (:in-minutes arrival))]
                      (dom/td #js {:className (str "text-right time time" (:in-hours arrival) (:in-minutes arrival))}
                              (dom/img #js {:src "images/tram.png"}
                                       (dom/div nil display-time))))))))

(defn arrival-table [arrivals owner]
  (reify
    om/IRender 
    (render [this]
            (dom/table #js {:className "tram-table"} 
                       (apply dom/tbody nil 
                              (om/build-all arrival-row arrivals))))))


(defn fetch-stationboard-data [ids on-complete]
  "Given a list of ids, returns the stationboard data from the server"
  (GET "http://localhost:7000/stationboard/008591193" {:response-format :json
                                                       :keywords? true 
                                                       :handler on-complete}))

(defn arrivals-from-stationboard [stationboard-data selected-views window-size]
  (:arrivals mocks))

(defn arrival-tables-view [app-state owner]
  "Takes as input a set of views (station id) and the size of the pane and renders the table views."
  (reify
    om/IInitState 
    (init-state [_] 
                ;{:arrivals mocks :window-size 0})
                {:station-data [] :arrivals [] :window-size []})
    om/IWillMount 
    (will-mount [_]
                ; Here we start the requests to get the arrival data
                (fetch-stationboard-data [] ;todo collect stations to query
                                         (fn [data] (om/set-state! owner :arrivals (arrivals-from-stationboard data (:selected-views app-state) nil)))))
    
    om/IRenderState
    (render-state [this {:keys [arrivals]}]
                  (apply dom/div #js {:className "row"} 
                         (map #(dom/div #js {:className "multi-col col-sm-6 col-md-6"} %)
                              (om/build-all arrival-table arrivals))))))

(defn main []
  (om/root arrival-tables-view app-state
           {:target (. js/document (getElementById "my-app"))}))

