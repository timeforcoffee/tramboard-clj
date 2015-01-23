(ns tramboard-clj.core.include
  (:use [hiccup core page element]))

(defn include-javascript []
  [(include-js "js/main.js")
   ;(include-js "//code.jquery.com/jquery-2.1.3.min.js")
   ;(include-js "//netdna.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js")
   ])
