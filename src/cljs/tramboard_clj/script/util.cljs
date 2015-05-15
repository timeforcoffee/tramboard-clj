(ns tramboard-clj.script.util
  (:require-macros [cljs.core.async.macros :refer [go]]))

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
  (let [head (first destinations)
        tail (rest destinations)]
    (if (nil? head) [(clean-arrival arrival)]
      (if (arrival-equal arrival head) 
        (conj tail (merge head (clean-arrival arrival)))
        (conj (edit-or-add-destination tail arrival) head)))))

(defn get-destination [destinations arrival]
  (let [filtered-destinations (filter #(arrival-equal arrival %) destinations)]
    (if (> (count filtered-destinations) 0) (first filtered-destinations) nil)))

(defn init-destinations []
  #{})

; TODO make this generic
(defn get-stops-in-order [view]
  (map #(get (:stops view) %) (:stops-order view)))

(defn ga [& more]
  (when js/ga
    (.. (aget js/window "ga")
        (apply nil (clj->js more)))))
