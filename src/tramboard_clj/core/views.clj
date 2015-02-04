(ns tramboard-clj.core.views
  (:use [hiccup core page element]
        [tramboard-clj.core.include])
  (:require [tramboard-clj.core.zvv :as zvv]))


;<meta charset="utf-8">
;<meta http-equiv="X-UA-Compatible" content="IE=edge">
;<meta name="viewport" content="width=device-width, initial-scale=1">

(defn index-page []
  (html5
    [:head
     [:meta {:charset "UTF-8"}]
     [:meta {:http-equiv "Content-Type"    :content "text/html;charset=utf-8"}]
     [:meta {:http-equiv "X-UA-Compatible" :content "IE=edge"}]
     [:meta {:name "viewport" :content "width=device-width, initial-scale=1"}]
     [:title "Tramboard"]
     (include-css "//netdna.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css")
     (include-css "/css/styles.css")]
    (into
      [:body [:div {:id "my-app"}]]
      (include-javascript))))

(defn station [id]
  {:headers {"Content-Type" "application/json; charset=utf-8"}
   :body (zvv/station id)})

(defn query-stations [query]
  {:headers {"Content-Type" "application/json; charset=utf-8"}
   :body (zvv/query-stations query)})
