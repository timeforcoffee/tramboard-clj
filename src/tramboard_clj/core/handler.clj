(ns tramboard-clj.core.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]
            [tramboard-clj.core.views :refer :all]))

(defroutes app-routes
  (GET "/" [] (index-page))
  (GET "/stationboard/:id{[0-9]+}" [id] (station id))
  (route/resources "/")
  (route/not-found "Not Found"))

(def app
  (wrap-defaults app-routes site-defaults))

