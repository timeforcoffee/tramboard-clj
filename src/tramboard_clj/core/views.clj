(ns tramboard-clj.core.views
  (:use [hiccup core page element]))

(defn index-page []
  (html5
    [:head
     [:title "Hello World"]
     (include-css "//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css")
     (include-css "/css/style.css")]
    [:body
     [:div {:id "my-app"}]
     (include-js "http://fb.me/react-0.12.2.js")
     (include-js "out/goog/base.js")
     (include-js "js/main.js")
     (javascript-tag "goog.require('tramboard_clj.script.tram');goog.require('tramboard_clj.script.figwheel');goog.require('ajax.core');")]))