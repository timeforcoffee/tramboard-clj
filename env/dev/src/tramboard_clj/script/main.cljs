(ns tramboard-clj.script.main
  (:require [figwheel.client :as fw]
            [tramboard-clj.script.tram :as tram]
            [clojure.browser.repl :as repl]
            [ankha.core :as ankha]
            [om.core :as om :include-macros true]))

(enable-console-print!)

(defn debug []
  (om/root
    ankha/inspector tram/app-state {:target (js/document.getElementById "ankha")}))

; TODO maybe wrap this in a (defmacro run-only-in-dev)
;(repl/connect "http://localhost:9000/repl")

(fw/watch-and-reload
  :websocket-url "ws://localhost:3449/figwheel-ws"
  :jsload-callback (fn []
                     (tram/main)
                     (debug)))

(tram/main)
(debug)