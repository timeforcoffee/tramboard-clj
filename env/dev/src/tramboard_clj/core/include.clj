(ns tramboard-clj.core.include
  (:use [hiccup core page element]))

(defn include-javascript []
  [(include-js "out/goog/base.js")
   (include-js "js/dev.js")
   (javascript-tag "goog.require('tramboard_clj.script.main');")])
