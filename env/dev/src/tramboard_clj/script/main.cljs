(ns tramboard-clj.script.main
  (:require [figwheel.client :as fw]
            [tramboard-clj.script.tram :as tram]
            [clojure.browser.repl :as repl]
            [om.core :as om :include-macros true]
            [omdev.core :as omdev]))

(enable-console-print!)

; TODO maybe wrap this in a (defmacro run-only-in-dev)
;(repl/connect "http://localhost:9000/repl")

(defn main []
  (omdev/dev-component tram/stationboard tram/app-state
                       {:target (.getElementById js/document "my-app")
                        :tx-listen (fn [tx-data root-cursor]
                                     (println "listener 1: " tx-data))}))

(fw/watch-and-reload
  :websocket-url "ws://localhost:3449/figwheel-ws"
  :jsload-callback (fn []
                     (main)))

(main)
