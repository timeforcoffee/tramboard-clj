(ns tramboard-clj.components.icon
  (:require [clojure.string :as str]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]))

(defn- is-white [color]
  (let [upper-case-color (when-not (nil? color) (str/upper-case color))]
    (or (or (nil? color) (str/blank? color))
        (or (= upper-case-color "#FFF")
            (= upper-case-color "#FFFFFF")))))


(defn number-icon [{:keys [number colors type]} owner]
  (reify
    om/IRender
    (render [this]
            (let [big      (>= (count number) 3)
                  too-big  (>= (count number) 5)
                  bg-color (:bg colors)
                  fg-color (:fg colors)
                  white    (is-white bg-color)]
              (dom/span #js {:className (str "bold number-generic number-" number
                                             (when big " number-big")
                                             (when white " number-border"))
                             :style #js {:backgroundColor bg-color :color fg-color}
                             :aria-label (str type " number " number)}
                        (dom/div #js {:className "number-inner"} (if too-big (apply str (take 4 number)) number)))))))

(defn transport-icon [{:keys [type accessible-text]} owner]
  (reify
    om/IRender
    (render [this]
            (let [map-transport-icon (fn [type] (case type
                                                  "tram"        "fa-tram"
                                                  "subway"      "fa-train"
                                                  "rack-train"  "fa-subway"
                                                  "cable-car"   "fa-cable-car"
                                                  "bus"         "fa-bus"
                                                  "train"       "fa-subway"
                                                  "taxi"        "fa-taxi"
                                                  "s-train"     "fa-subway"
                                                  "boat"        "fa-ship"
                                                  
                                                  "fa-subway"))
                  icon               (dom/i #js {:className (str "fa " (map-transport-icon type))
                                                 :aria-label accessible-text})]
              (if (or (= type "tram") (= type "cable-car"))
                (dom/span #js {:className "span-fa"
                               :aria-label accessible-text} icon) icon)))))

(defn switch [{:keys [checkbox-id checked]} owner {:keys [on-click-action]}]
  (reify
    om/IRender
    (render [this]
            (dom/div #js {:className "label-switch"} 
                     (dom/input #js {:type "checkbox"
                                     :id checkbox-id
                                     :checked checked
                                     :onClick on-click-action
                                     :onTouchEnd on-click-action})
                     (dom/div #js {:className "checkbox"})))))