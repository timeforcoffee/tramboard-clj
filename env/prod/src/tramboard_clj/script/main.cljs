(ns tramboard-clj.script.main
  (:require [tramboard-clj.script.tram :as tram]
            [clojure.browser.repl :as repl]))

(enable-console-print!)

(tram/main)