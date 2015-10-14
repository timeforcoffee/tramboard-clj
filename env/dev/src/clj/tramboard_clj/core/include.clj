(ns tramboard-clj.core.include
  (:require [hiccup.page :refer [include-js]]
            [hiccup.element :refer [javascript-tag]]))

(defn include-javascript []
  [(include-js "out/goog/base.js")
   (include-js "js/dev.js")
   (javascript-tag "goog.require('tramboard_clj.script.main');")])
