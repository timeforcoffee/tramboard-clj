(ns tramboard-clj.core.views
  (:use [hiccup core page element]
        [tramboard-clj.core.include]
        [ring.util.json-response]))

(defn index-page []
  (html5
    [:head
     [:title "Hello World"]
     (include-css "//netdna.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css")
     (include-css "/css/style.css")]
    (into
      [:body [:div {:id "my-app"}]]
      (include-javascript))))

(defn station [id]
  "return no data, for now"
  (json-response []))

;(defn station [id]
;  (json-response {:foo (str "station_id" id)}))
