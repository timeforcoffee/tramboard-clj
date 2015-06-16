(ns tramboard-clj.core.include
  (:use [hiccup core page element]))

(defn include-javascript []
  [(include-js "js/main.js")])
