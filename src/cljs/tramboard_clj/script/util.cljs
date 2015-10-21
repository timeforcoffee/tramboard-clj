(ns tramboard-clj.script.util
  (:require-macros [cljs.core.async.macros :refer [go]]))

(defonce locations
  [
   {:id :ch     :name "Whole Switzerland"  :short-label "Switzerland" :flag-class "ch"    :api "ch" :active true}
   {:id :ch_zh  :name "Zurich City & Canton" :short-label "Zurich"             :flag-class "ch_zh" :api "zvv" :active true}
   {:id :ch_ge  :name "Geneva City & Canton" :short-label "Geneva"             :flag-class "ch_ge" :api "gva" :active true}
   {:id :ch_lu  :name "Lucerne & parts of Central Switzerland" :short-label "Lucerne" :flag-class "ch_lu" :api "vbl" :active true}
   {:id :ch_bs  :name "Basel City" :short-label "Basel"   :flag-class "ch_bs" :api "bvb" :active true}
   ;{:id :ch_nw  :name "Nordwestschweiz" :short-label "Nordwestschweiz" :flag-class "ch_bs" :api "blt" :active true}
   ;{:id :ch_os  :name "Ostschweiz" :short-label "Ostschweiz" :flag-class "ch_os" :api "ost" :active true}
   ])
   


(defn get-location [location-id]
  (let [found-locations (filter #(= location-id (:id %)) locations)]
    (if (empty? found-locations) (get-location :ch) (first found-locations))))


(defn wait-on-channel [channel function]
  (go
    (loop []
      (when-some
        [channel-output (<! channel)]
        (function channel-output)
        (recur)))))


(defn arrival-equal [arrival1 arrival2]
  (and (= (:to arrival1) (:to arrival2)) (= (:number arrival1) (:number arrival2))))

(defn- clean-arrival [arrival]
  (select-keys arrival [:to :number :colors :type :sort-string :excluded]))

(defn edit-or-add-destination [destinations arrival]
  (if (set? destinations) (edit-or-add-destination (into [] destinations) arrival)
    (if (empty? destinations) [(clean-arrival arrival)]
      (let [[head & tail] destinations]
        (if (arrival-equal arrival head)
          (conj tail (merge head (clean-arrival arrival)))
          (conj (edit-or-add-destination tail arrival) head))))))

(defn get-destination [destinations arrival]
  (let [filtered-destinations (filter #(arrival-equal arrival %) destinations)]
    (if (> (count filtered-destinations) 0) (first filtered-destinations) nil)))

(defn init-destinations []
  [])

; TODO make this generic
(defn get-stops-in-order [view]
  (map #(get (:stops view) %) (:stops-order view)))

(defn ga [& more]
  (when js/ga
    (.. (aget js/window "ga")
        (apply nil (clj->js more)))))
