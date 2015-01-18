(ns tramboard-clj.core.include
  (:use [hiccup core page element]))

(defn include-javascript [] 
  [(include-js "http://fb.me/react-0.12.2.js")
   (include-js "js/main.js")])