(ns tramboard-clj.core.views
  (:use [hiccup core page element]
        [tramboard-clj.core.include]
        [ring.util.json-response]))

;<meta charset="utf-8">
;<meta http-equiv="X-UA-Compatible" content="IE=edge">
;<meta name="viewport" content="width=device-width, initial-scale=1">

(defn index-page []
  (html5
    [:head
     [:meta {:charset "utf-8"}]
     [:meta {:http-equiv "X-UA-Compatible" :content "IE=edge"}]
     [:meta {:name "viewport" :content "width=device-width, initial-scale=1"}]
     [:title "Tramboard"]
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
