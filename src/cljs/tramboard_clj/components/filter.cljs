(ns tramboard-clj.components.filter
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [cljs.core.async :refer [put!]]
            [tramboard-clj.components.icon :refer [number-icon transport-icon]]
            [tramboard-clj.script.util     :refer [is-in-destinations]]
            [clojure.string :as str]))

; TODO stop / stop-id should probably not be hardcoded
(defn- destination-editor [{:keys [stop destination checked]}]
  (reify
    om/IRenderState
    (render-state [this {:keys [toggle-filter-ch]}]
                  (println "filter dest" destination)
                  (dom/div #js {:className "filter-destination"}
                           (dom/div #js {:className "filter-checkbox"} (dom/input #js {:type "checkbox"
                                                                        :checked checked
                                                                        :onClick (fn [e]
                                                                                   (put! toggle-filter-ch {:destination {:stop-id (:id stop)
                                                                                                                      :number (:number destination)
                                                                                                                      :to (:to destination)}})
                                                                                   (.preventDefault e))}))
                           (dom/div #js {:className "filter-number"} (om/build number-icon destination))
                           (dom/div #js {:className "filter-destination"} (:to destination))))))


(defn- group-editor [{:keys [stop group]}]
  (reify
    om/IRenderState
    (render-state [this {:keys [toggle-filter-ch]}]
                  (println group)
                  (apply dom/div nil
                         (map #(om/build destination-editor
                                         {:stop stop
                                          :destination %
                                          :checked (not (is-in-destinations (:excluded-destinations stop) %))}
                                         {:init-state {:toggle-filter-ch toggle-filter-ch}})
                              (sort-by :to group))))))

(defn- stop-editor [stop]
  (reify
    om/IRenderState
    (render-state [this {:keys [toggle-filter-ch]}]
                  (dom/div nil
                           (dom/h4 #js {:className "thin"} (:name stop))
                           (apply dom/div #js {:className "filter-stop"}
                                  (map #(om/build group-editor
                                                  {:stop stop :group (get %1 1)}
                                                  {:init-state {:toggle-filter-ch toggle-filter-ch}})
                                       (group-by :number (sort-by :to (:known-destinations stop)))))))))





(defn c-filter-editor [view]
  (reify
    om/IRenderState
    (render-state [this {:keys [toggle-filter-ch]}]
                  (println "filter view" view)
                  (apply dom/div #js {:className "filter-editor"}
                         (map #(om/build stop-editor (val %) {:init-state {:toggle-filter-ch toggle-filter-ch}}) (:stops view))))))
