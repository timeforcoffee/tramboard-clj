(ns tramboard-clj.core.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]
            [ring.middleware.gzip :refer [wrap-gzip]]
            [tramboard-clj.core.views :refer :all]))

(defroutes app-routes
  (GET "/" [] (index-page))
  (GET "/stationboard/:id{[0-9]+}" [id] (station id))
  (route/resources "/")
  (route/not-found "Not Found"))

(def app
  (wrap-gzip (wrap-defaults app-routes site-defaults)))
