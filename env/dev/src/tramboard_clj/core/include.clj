(ns tramboard-clj.core.include
  (:use [hiccup core page element]))

(defn include-javascript [] 
  [[:div {:id "ankha"}]
   (include-js "//fb.me/react-0.12.2.js")
   (include-js "out/goog/base.js")
   (include-js "js/dev.js")
   (javascript-tag "goog.require('tramboard_clj.script.tram');goog.require('tramboard_clj.script.main');goog.require('ajax.core');")])