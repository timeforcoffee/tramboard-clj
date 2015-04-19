(ns tramboard-clj.components.util
  (:require [clojure.string :as str]
            [tramboard-clj.components.icon :refer [transport-icon]]
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
                                       (dom/div #js {:className "menu-icon-parent"}
                                                (dom/span #js {:className "left-icon"} left-icon)
                                                title
                                                (dom/span #js {:className "right-icon"} right-icon)))))))

(defn strong [text]
  (dom/span #js {:className "thin"} text))

(defn slogan [_ owner]
  (reify
    om/IRender
    (render [this]
            (dom/h1 #js {:className "ultra-thin welcome-banner text-center"}
                    (dom/div nil
                             "Relax and don't wait at the stop for your next "
                             (strong "bus")   " " (om/build transport-icon {:type "bus"})   ", "
                             (strong "tram")  " " (om/build transport-icon {:type "tram"})  ", "
                             (strong "train") " " (om/build transport-icon {:type "train"}) ", "
                             (strong "boat")  " " (om/build transport-icon {:type "boat"})  " or "
                             (strong "cable car") " " (om/build transport-icon {:type "cable-car"}) ".")))))

(defn flag [{:keys [country label]} owner]
  (reify
    om/IRender
    (render [this]
            (dom/div #js {:className "phoca-flagbox"}
                     ; TODO Check this accessibility
                     (dom/span #js {:aria-label label
                                    :className (str "phoca-flag " country)})))))
