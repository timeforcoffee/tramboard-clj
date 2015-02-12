(ns tramboard-clj.core.server
  (:require [ring.adapter.jetty :as ring]
            [tramboard-clj.core.handler :as handler]))

(defn start [port]
  (ring/run-jetty handler/app {:port port
                               :join? false}))

(defn -main []
  (let [port (Integer. (or (System/getenv "PORT") "8080"))]
    (start port)))