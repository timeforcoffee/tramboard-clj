(ns tramboard-clj.components.location
  (:require [clojure.string :as str]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]))


(defn choose-location-pane [])
; TODO this is the content somehow
;(dom/h2 #js {:className "ultra-thin text-center"}
                     ;        (dom/div nil "Don't live there? Pick "
                     ;                 (om/build location-dropdown nil {:opts {:text "another location"}})))

; {:id :ch     :name "Switzerland" :flag-class "ch"  :api "zvv" :active true}
(defn location-dropdown-item [{:keys [id name flag-class]} owner]
  (reify
    om/IRender
    (render [this]
            (dom/li nil (dom/a #js {:href "#" :onClick (fn [e] (js/alert "prout"))} name)))))

(defn location-dropdown [_ owner {:keys [text]}]
  (reify
    om/IInitState
    (init-state [_]
                {:open false})
    om/IRenderState
    (render-state [this {:keys [open]}]
                  (dom/span #js {:className "dropdown"
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
                                   text (dom/span #js {:className "caret"}))
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
                                   (om/build-all location-dropdown-item (remove #(not (:active %)) locations)))))))
