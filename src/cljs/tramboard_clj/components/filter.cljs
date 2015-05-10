(ns tramboard-clj.components.filter
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [cljs.core.async :refer [put!]]
            [tramboard-clj.components.icon :refer [number-icon transport-icon]]
            [tramboard-clj.script.util     :refer [is-in-destinations]]
            [clojure.string :as str]))

(defn- add-counter [col]
  (map-indexed #(assoc %2 :idx %1) col))

; TODO stop / stop-id should probably not be hardcoded
(defn- destination-editor [{:keys [stop destination checked]}]
  (reify
    om/IRenderState
    (render-state [this {:keys [toggle-filter-ch]}]
      (let [checkbox-id (str "checkbox-" (:idx stop) "-" (:idx destination))]
                  (dom/div #js {:className (str "filter-destination" (when-not checked " disabled"))}
                            (dom/i #js {:className "fa fa-ban"})
                           (dom/div #js {:className "filter-checkbox"} (dom/input #js {:type "checkbox"
                                                                        :id checkbox-id
                                                                        :checked checked
                                                                        :onClick (fn [e]
                                                                                   (put! toggle-filter-ch {:destination {:stop-id (:id stop)
                                                                                                                      :number (:number destination)
                                                                                                                      :to (:to destination)}})
                                                                                   (.preventDefault e))}))
                           (dom/label #js {:htmlFor checkbox-id}
                              (dom/span #js {:className "filter-destination-number"} (om/build number-icon destination))
                              (dom/span #js {:className "filter-destination-name"} (:to destination))))))))


(defn- group-editor [{:keys [stop group]}]
  (reify
    om/IRenderState
    (render-state [this {:keys [toggle-filter-ch]}]
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
                                                  {:stop stop :group %}
                                                  {:init-state {:toggle-filter-ch toggle-filter-ch}})
                                       (partition-by :number (sort-by :sort-string (add-counter (:known-destinations stop))))))))))

(defn c-filter-editor [view]
  (reify
    om/IRenderState
    (render-state [this {:keys [toggle-filter-ch]}]
                  (apply dom/div #js {:className "filter-editor"}
                         (map #(om/build stop-editor % {:init-state {:toggle-filter-ch toggle-filter-ch}}) (add-counter (map #(val %) (:stops view))))))))
