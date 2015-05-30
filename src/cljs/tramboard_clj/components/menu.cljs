(ns tramboard-clj.components.menu
  (:require [clojure.string :as str]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]))

(defn menu-icon [_ owner {:keys [on-click]}]
  (reify
    om/IRenderState
    (render-state [this {:keys [span-class icon-class hidden-text]}]
                  (dom/a #js {:className (str "link-icon glyphicon " icon-class)
                              :href "#"
                              :aria-label hidden-text
                              :onClick on-click}))))


(defn menu-bar [_ owner]
  (reify
    om/IRenderState
    (render-state [this {:keys [left-icon right-icon title]}]
                  (dom/header #js {:className "menu-bar"}
                              (dom/div #js {:className "container-fluid"}
                                       (dom/div #js {:className "menu-icon-parent no-link"}
                                                (dom/span #js {:className "left-icon"} left-icon)
                                                title
                                                (dom/span #js {:className "right-icon"} right-icon)))))))
