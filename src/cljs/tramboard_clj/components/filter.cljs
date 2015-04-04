(ns tramboard-clj.components.filter
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [clojure.string :as str]))

(defn c-filter-editor []
  ""
  (reify
    om/IRender
    (render [this]
            (dom/div #js {:className "filter-editor"}
                     "this div will contain the filter editor (position in dom not final)"))))
