(ns tramboard-clj.components.location
  (:require [clojure.string :as str]
            [cljs.core.async :refer [put!]]
            [tramboard-clj.components.util :refer [slogan flag]]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]))


; {:id :ch     :name "Switzerland" :flag-class "ch"  :api "zvv" :active true}

; TODO pass location here and transact! on it instead of using a channel
; we can define a listener to update the app
(defn location-item [{:keys [id name flag-class short-label] :as location} owner {:keys [class-name use-short-label]}]
  (reify
    om/IRenderState
    (render-state [this {:keys [location-ch]}]
                  (dom/li #js {:className class-name} 
                          (dom/a #js {:href "#" 
                                      :onClick (fn [e]
                                                 (put! location-ch {:id id})
                                                 (.preventDefault e))}
                                 (om/build flag {:country flag-class :label name}) " " (if use-short-label short-label name))))))

(defn choose-location-pane [{:keys [locations] :as app} owner]
  (reify
    om/IRenderState
    (render-state [this {:keys [location-ch]}]
                  (dom/div #js {:className "pane container-fluid"}
                           (dom/div #js {:className "responsive-display"}
                                    (om/build slogan nil)
                                    (dom/h1 #js {:className "ultra-thin text-center"}
                                            (dom/div nil "Pick your current location:"))
                                    (dom/h4 #js {:className "text-center thin"}
                                            "(you can change it later)")
                                    (dom/h1 #js {:className "ultra-thin text-center"}
                                            (apply dom/ul #js {:className "list-unstyled text-left inline-block"}
                                                   (om/build-all location-item locations {:init-state {:location-ch location-ch}}))))))))
