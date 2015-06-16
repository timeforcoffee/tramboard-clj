(ns tramboard-clj.script.main
  (:require [tramboard-clj.script.tram :as tram]
            [om.core :as om :include-macros true]))

(set-print-fn! #())

(tram/init!)
(tram/main)
