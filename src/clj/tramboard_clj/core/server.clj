(ns tramboard-clj.core.server
  (:require [ring.adapter.jetty :as ring]
            [tramboard-clj.core.handler :as handler]))

(defn- notice-error [fun & args]
  (try (apply fun args) (catch Exception e
                          (do
                            (println e)
                            (com.newrelic.api.agent.NewRelic/noticeError e)
                            (throw e)))))


(defn wrap-nr-error [handler]
  (fn [req]
    (let [resp (notice-error handler req)]
      resp)))

(defn start [port]
  (ring/run-jetty (wrap-nr-error handler/app) {:port port
                               :join? false}))

(defn -main []
  (let [port (Integer. (or (System/getenv "PORT") "8080"))]
    (start port)))
