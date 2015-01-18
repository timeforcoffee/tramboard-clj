(ns tramboard-clj.core.views
  (:use [hiccup core page element]
        [tramboard-clj.core.include]))

(defn index-page []
  (html5
    [:head
     [:title "Hello World"]
     (include-css "//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css")
     (include-css "/css/style.css")]
    (into 
      [:body [:div {:id "my-app"}]]
      (include-javascript))))