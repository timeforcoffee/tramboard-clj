(ns tramboard-clj.script.util
    (:require-macros [cljs.core.async.macros :refer [go]]))

(defn wait-on-channel [channel function]
  (go
    (loop []
      (when-some
        [channel-output (<! channel)]
        (function channel-output)
        (recur)))))

; TODO make this generic
(defn is-in-destinations [destinations arrival]
  (let [keys              [:to :number]
        is-in-destination (contains? (into #{} (map #(select-keys % keys) destinations))
                                     ; the entry that corresponds to the destination
                                     (select-keys arrival keys))]
    is-in-destination))

(defn remove-from-destinations [destinations arrival]
  (remove #(and (= (:to %) (:to arrival)) (= (:number %) (:number arrival))) destinations))

(defn add-to-destinations [destinations arrival]
  (conj destinations (select-keys arrival [:to :number :colors :type :sort-string])))

; TODO make this generic
(defn get-stops-in-order [view]
  (map #(get (:stops view) %) (:stops-order view)))

(defn ga [& more]
  (when js/ga
    (.. (aget js/window "ga")
        (apply nil (clj->js more)))))
