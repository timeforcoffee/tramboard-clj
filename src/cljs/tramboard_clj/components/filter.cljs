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
    (render-state [this {:keys [add-filter-ch]}]
            (println "filter dest" destination)
            (dom/div #js {:className "destination"}
                     (dom/div #js {:className ""} (om/build transport-icon destination))
                     (dom/div #js {:className ""} (om/build number-icon destination))
                     (dom/div #js {:className "grow"} (:to destination))
                     (dom/div #js {:className ""} (dom/input #js {:type "checkbox"
                                                                  :checked checked
                                                                  :onClick (fn [e]
                                                                             (put! add-filter-ch {:destination {:stop-id (:id stop)
                                                                                                  :number (:number destination)
                                                                                                  :to (:to destination)}})
                                                                             (.preventDefault e))}))))))


(defn- stop-editor [stop]
  (reify
    om/IRenderState
    (render-state [this {:keys [add-filter-ch]}]
            (println "filter stop" stop)
            (apply dom/div #js {:className "stop"}
                   (dom/div #js {:className "stop-name"} (:name stop))
                   (map #(om/build destination-editor
                                   {:stop stop
                                    :destination %
                                    :checked (is-in-destinations (:excluded-destinations stop) %)}
                                   {:init-state {:add-filter-ch add-filter-ch}})
                        (sort-by :number (sort-by :to (:known-destinations stop))))))))





(defn c-filter-editor [view]
  (reify
    om/IRenderState
    (render-state [this {:keys [add-filter-ch]}]
            (println "filter view" view)
            (apply dom/div #js {:className "filter-editor"}
                     (map #(om/build stop-editor (val %) {:init-state {:add-filter-ch add-filter-ch}}) (:stops view))))))
