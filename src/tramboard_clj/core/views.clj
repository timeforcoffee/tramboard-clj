(ns tramboard-clj.core.views
  (:use [hiccup core page element]
        [tramboard-clj.core.include])
  (:require [tramboard-clj.core.zvv :as zvv]))

(defn index-page []
  (html5
    [:head
     [:meta {:charset "UTF-8"}]
     [:meta {:http-equiv "Content-Type"    :content "text/html;charset=utf-8"}]
     [:meta {:http-equiv "X-UA-Compatible" :content "IE=edge"}]
     [:meta {:name "viewport" :content "width=device-width, initial-scale=1"}]
     [:title "Time for Coffee!"]
     (include-css "//netdna.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css")
     (include-css "//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css")
     (include-css "/css/styles.css")
     (javascript-tag (str "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                           (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                           m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                           })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
                           ga('create', '" (or (System/getenv "GA_TRACKING") "dummy") "', 'auto');ga('send', 'pageview');"))]
    (into
      [:body [:div {:id "my-app"}]]
      (include-javascript))))

(defn station [id]
  {:headers {"Content-Type" "application/json; charset=utf-8"}
   :body (zvv/station id)})

(defn query-stations [query]
  {:headers {"Content-Type" "application/json; charset=utf-8"}
   :body (zvv/query-stations query)})
