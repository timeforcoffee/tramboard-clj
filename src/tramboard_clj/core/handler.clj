(ns tramboard-clj.core.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults api-defaults]]
            [ring.middleware.gzip :refer [wrap-gzip]]
            [ring.middleware.json :refer [wrap-json-response]]
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
    (wrap-routes (wrap-routes (GET "/stationboard/:id{[0-9]+}" [id] (station id)) wrap-json-response) wrap-no-cache)
    (wrap-routes (wrap-routes (GET "/stations/:query{.+}" [query] (query-stations query)) wrap-json-response) wrap-no-cache)))

(defroutes app-routes
  (wrap-routes (GET "/" [] (index-page)) wrap-cache)
  (wrap-routes (route/resources "/public") wrap-cache)
  (route/not-found "Not Found"))

(def site
  (wrap-routes app-routes wrap-defaults (assoc site-defaults :cookies false :session false)))

(def api
  (wrap-routes api-routes wrap-defaults api-defaults))

(def app
  (wrap-gzip (wrap-etag (routes api site))))
