(ns tramboard-clj.core.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults api-defaults]]
            [ring.middleware.gzip :refer [wrap-gzip]]
            [ring.middleware.etag :refer [wrap-etag]]
            [tramboard-clj.core.views :refer :all]))

(defn wrap-no-cache [h]
  (fn [req]
    (let [resp (h req)]
      (assoc-in resp [:headers "cache-control"] "no-cache"))))

(defn wrap-cache [h]
  (fn [req]
    (let [resp (h req)]
      (assoc-in resp [:headers "cache-control"] "public"))))

(defroutes api-routes
  (context "/api" []
    (wrap-no-cache (GET "/stationboard/:id{[0-9]+}" [id] (station id)))))

(defroutes app-routes
  (wrap-cache (GET "/" [] (index-page)))
  (wrap-cache (route/resources "/"))
  (route/not-found "Not Found"))

(def site
  (wrap-defaults app-routes (assoc site-defaults :cookies false :session false)))

(def api
  (wrap-defaults api-routes api-defaults))

(def app
  (wrap-gzip (wrap-etag (routes api site))))
