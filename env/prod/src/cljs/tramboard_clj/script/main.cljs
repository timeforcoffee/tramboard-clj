(ns tramboard-clj.script.main
  (:require [tramboard-clj.script.tram :as tram]
            [om.core :as om :include-macros true]))

(enable-console-print!)

(tram/hook-browser-navigation!)
(tram/main)
