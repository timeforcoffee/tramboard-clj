(ns tramboard-clj.script.figwheel
  (:require [figwheel.client :as fw]
            [tramboard-clj.script.tram :as tram]))

(enable-console-print!)
(fw/watch-and-reload
  :websocket-url "ws://localhost:3449/figwheel-ws"
  :jsload-callback (fn []
                     (tram/main)))

(tram/main)