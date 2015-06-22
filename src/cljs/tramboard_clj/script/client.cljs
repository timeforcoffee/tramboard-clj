(ns tramboard-clj.script.client
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [goog.events :as events]
            [goog.history.EventType :as EventType]
            [cljs.core.async :refer [put! chan <! >! close! timeout]])
  (:import [goog.net XhrIo]))

(defn fetch-stationboard-data [stop-id api complete-ch error-ch cancel-ch transformation-fn]
  (let [xhr (XhrIo.)]
    (.setTimeoutInterval xhr 10000)
    (goog.events/listen
      xhr goog.net.EventType.SUCCESS
      (fn [e] (put! complete-ch {:stop-id stop-id :data (transformation-fn (js->clj (.getResponseJson xhr) :keywordize-keys true))})))
    (goog.events/listen
      xhr goog.net.EventType.ERROR
      (fn [e] (put! error-ch {:stop-id stop-id :data [] :error (.getLastError xhr)})))
    (.send xhr (str "/api/" (api) "/stationboard/" stop-id) "GET")
    (go
      (<! cancel-ch)
      (println "Canceling stationboard call " stop-id)
      (.abort xhr))))

(defn fetch-suggestions [value api suggestions-ch cancel-ch transformation-fn]
  (let [xhr        (XhrIo.)
        abort-chan (chan)]
    ; we introduce some timeout here
    (go (<! (timeout 250)) (put! abort-chan false))

    (go
      (when-not (<! abort-chan)
        (goog.events/listen
          xhr goog.net.EventType.SUCCESS
          (fn [e] (put! suggestions-ch (:stations (js->clj (.getResponseJson xhr) :keywordize-keys true)))))
        (goog.events/listen
          xhr goog.net.EventType.ERROR
          (fn [e] (println "ERROR")))
        (.send xhr (str "/api/" (api) "/stations/" value) "GET")))
    (go
      (<! cancel-ch)
      (do
        (put! abort-chan true)
        (.abort xhr)))))
