(ns tramboard-clj.core.views
  (:use [hiccup core page element]
        [tramboard-clj.core.include]
        [ring.util.json-response])
  (:require [tramboard-clj.core.zvv :as zvv]))


;<meta charset="utf-8">
;<meta http-equiv="X-UA-Compatible" content="IE=edge">
;<meta name="viewport" content="width=device-width, initial-scale=1">

(defn index-page []
  (html5
    [:head
     [:meta {:charset "UTF-8"}]
     [:meta {:http-equiv "X-UA-Compatible" :content "IE=edge"}]
     [:meta {:name "viewport" :content "width=device-width, initial-scale=1"}]
     [:title "Tramboard"]
     (include-css "//netdna.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css")
     (include-css "/css/styles.css")]
    (into
      [:body [:div {:id "my-app"}]]
      (include-javascript))))

(defn station [id]
  (json-response (zvv/station id)))
