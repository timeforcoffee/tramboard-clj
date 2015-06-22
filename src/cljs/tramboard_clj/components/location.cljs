(ns tramboard-clj.components.location
  (:require [clojure.string :as str]
            [cljs.core.async :refer [put!]]
            [tramboard-clj.script.util :refer [wait-on-channel]]
            [tramboard-clj.components.util :refer [slogan flag]]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]))

(defn location-item [{:keys [id name flag-class short-label] :as location} owner {:keys [class-name use-short-label]}]
  (reify
    om/IRenderState
    (render-state [this {:keys [location-ch]}]
                  (dom/a #js {:href "#"
                              :onClick (fn [e]
                                         (put! location-ch {:id id})
                                         (.preventDefault e))}
                         (dom/li #js {:className class-name}
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

(defn location-picker [{:keys [location locations]} owner]
  (reify
    om/IRenderState
    (render-state [this {:keys [open location-ch]}]
                  (dom/div #js {:className "dropdown-wrapper"}
                           (dom/div nil
                                    (dom/a #js {:className "edit-form-location-name"
                                                :href "#"
                                                :onClick (fn [e]
                                                           (om/set-state! owner :open (not open))
                                                           (.preventDefault e))}
                                           (:short-label location)
                                           (om/build flag {:country (:flag-class location) :label (:short-label location)})
                                           (dom/span #js {:className "caret"})))
                           (apply dom/ul
                                  #js {:className (str "dropdown-results no-link " (when-not open " hidden"))}
                                  (om/build-all location-item
                                                (remove #(= (:id %) (:id location)) locations)
                                                {:init-state {:location-ch location-ch}
                                                 :opts {:class-name "dropdown-results-item"
                                                        :use-short-label true}}))))))
