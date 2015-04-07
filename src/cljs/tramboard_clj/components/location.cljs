(ns tramboard-clj.components.location
  (:require [clojure.string :as str]
            [tramboard-clj.components.util :refer [slogan flag]]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]))


; {:id :ch     :name "Switzerland" :flag-class "ch"  :api "zvv" :active true}
(defn- location-item [{:keys [id name flag-class]} owner]
  (reify
    om/IRender
    (render [this]
            (dom/li nil (dom/a #js {:href "#" :onClick (fn [e] (js/alert "prout"))} (om/build flag {:country flag-class :label name}) " " name)))))

(defn- location-picker [{:keys [locations]} owner]
  (reify
    om/IInitState
    (init-state [_]
                {:open false})
    om/IRenderState
    (render-state [this {:keys [open]}]
                  (dom/span #js {:className "bold dropdown"
                                 :onBlur    (fn [e]
                                              (when-not (om/get-state owner :mouse)
                                                (om/set-state! owner :open false))
                                              (.preventDefault e))}
                            (dom/a #js {:onClick (fn [e]
                                                   (om/update-state! owner :open #(not %))
                                                   (.preventDefault e))
                                        :href "#"
                                        :className "dropdown-toggle"
                                        :aria-expanded "false"}
                                   "select a location" (dom/span #js {:className "caret"}))
                            (apply dom/ul #js {:className "dropdown-menu"
                                               :role "menu"
                                               :ref "dropdown-menu"
                                               :style #js {:display (if open "block" "none")}
                                               :onMouseEnter (fn [e]
                                                               (om/set-state! owner :mouse true)
                                                               (.preventDefault e))
                                               :onMouseLeave (fn [e]
                                                               (om/set-state! owner :mouse false)
                                                               (.preventDefault e))}
                                   (om/build-all location-item (remove #(not (:active %)) locations)))))))

(defn choose-location-pane [{:keys [locations] :as app} owner]
  (reify
    om/IRender
    (render [this]
            (dom/div #js {:className "container-fluid"}
                     (dom/div #js {:className "responsive-display"}
                              (om/build slogan nil)
                              (dom/h1 #js {:className "ultra-thin text-center"}
                                      (dom/div nil "Pick your location (you can change later)")

                                      (apply dom/ul #js {:className "list-unstyled"}
                                             (om/build-all location-item locations))))))))
