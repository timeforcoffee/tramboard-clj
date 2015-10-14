(ns tramboard-clj.core.include
  (:require [hiccup.page :refer [include-js]]))

(defn include-javascript []
  [(include-js "js/main.js")])
