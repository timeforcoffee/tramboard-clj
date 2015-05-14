(ns tramboard-clj.components.filter
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [cljs.core.async :refer [put!]]
            [tramboard-clj.components.icon :refer [number-icon transport-icon switch]]
            [tramboard-clj.script.util     :refer [is-in-destinations]]
            [clojure.string :as str]))

(defn- add-counter [col]
  (map-indexed #(assoc %2 :idx %1) col))

; TODO put together, also with the one in "icon.cljs"
(defn- type-order [type]
  (case type
    "tram"        1
    "subway"      5
    "rack-train"  7
    "cable-car"   8
    "bus"         2
    "train"       4
    "s-train"     3
    "taxi"        9
    "boat"        6
    10))

; TODO put together, also with the one in "icon.cljs"
(defn- type-string [type]
  (case type
    "tram"        "Trams"
    "subway"      "Subways"
    "rack-train"  "Rack trains"
    "cable-car"   "Cable cars"
    "bus"         "Buses"
    "train"       "Trains"
    "s-train"     "Regional trains"
    "taxi"        "Taxis"
    "boat"        "Boats"
    10))

(defn- add-type-order [col] 
  (map #(assoc % :type-order (type-order (:type %))) col))

(defn- get-types [col] 
  (distinct (map :type col)))

(defn- destination-editor [{:keys [stop destination checked]}]
  (reify
    om/IRenderState
    (render-state [this {:keys [toggle-filter-ch]}]
                  (let [checkbox-id (str "checkbox-" (:idx stop) "-" (:idx destination))]
                    (dom/div #js {:className (str "filter-destination" (when-not checked " disabled"))}
                             (dom/i #js {:className "fa fa-ban"})
                             (dom/label #js {:className "filter-destination-label" :htmlFor checkbox-id}
                                        (dom/span #js {:className "filter-destination-number"} (om/build number-icon destination))
                                        (dom/span #js {:className "filter-destination-name"} (:to destination))
                                        (om/build switch {:checkbox-id checkbox-id :checked checked} 
                                                  {:opts {:on-click-action (fn [e]
                                                                             (put! toggle-filter-ch {:destination {:stop-id (:id stop)
                                                                                                                   :number (:number destination)
                                                                                                                   :to (:to destination)}})
                                                                             (.preventDefault e))}})))))))


(defn- line-editor [{:keys [stop destinations-by-group]}]
  (reify
    om/IRenderState
    (render-state [this {:keys [toggle-filter-ch]}]
                  (apply dom/div #js {:className "filter-group"}
                         (map #(om/build destination-editor
                                         {:stop stop
                                          :destination %
                                          :checked (not (is-in-destinations (:excluded-destinations stop) %))}
                                         {:init-state {:toggle-filter-ch toggle-filter-ch}})
                              (sort-by :to destinations-by-group))))))

(defn- type-editor [{:keys [stop destinations-by-type types]}]
  (reify
    om/IRenderState
    (render-state [this {:keys [toggle-filter-ch]}]
                  (dom/div nil 
                           (apply dom/h4 #js {:className "filter-type-name normal"} (concat (map #(om/build transport-icon {:type %}) types) [(dom/span nil (str/join ", " (map #(type-string %) types)))]))
                           (apply dom/div #js {:className (str "filter-type " (when (>= (count destinations-by-type) 8) "filter-type-big"))}
                                  (map #(om/build line-editor
                                                  {:stop stop :destinations-by-group %}
                                                  {:init-state {:toggle-filter-ch toggle-filter-ch}})
                                       (partition-by :sort-string (sort-by :sort-string destinations-by-type))))))))

(defn- stop-editor [stop]
  (reify
    om/IRenderState
    (render-state [this {:keys [toggle-filter-ch]}]
                  (dom/div nil
                           (dom/h3 #js {:className "filter-stop-name thin"} (str "Known destinations for ") (dom/span #js {:className "bold"} (:name stop)))
                           (apply dom/div #js {:className "filter-stop"}
                                  (map #(om/build type-editor
                                                  {:stop stop :destinations-by-type % :types (get-types %)}
                                                  {:init-state {:toggle-filter-ch toggle-filter-ch}})
                                       (partition-by :type (sort-by :type-order (add-type-order (add-counter (:known-destinations stop)))))))))))

(defn c-filter-editor [view]
  (reify
    om/IRenderState
    (render-state [this {:keys [toggle-filter-ch]}]
                  (apply dom/div #js {:className "filter-editor"}
                         
                         (map #(om/build stop-editor % {:init-state {:toggle-filter-ch toggle-filter-ch}}) (add-counter (map #(val %) (:stops view))))))))

