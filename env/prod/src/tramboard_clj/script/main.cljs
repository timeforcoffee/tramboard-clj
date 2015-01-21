(ns tramboard-clj.script.main
  (:require [tramboard-clj.script.tram :as tram]
            [om.core :as om :include-macros true]))

(enable-console-print!)

(defn main []
  (om/root tram/stationboard tram/app-state
           {:target (. js/document (getElementById "my-app"))}))

(main)
