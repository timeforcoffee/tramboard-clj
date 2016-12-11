(ns tramboard-clj.api.common
  (:require [ring.util.codec :as codec]
            [clj-time.core :as t]
            [clj-time.format :as f]
            [cheshire.core :as json]
            [org.httpkit.client :as http]
            [clojure.xml :as xml]
            [clojure.zip :as zip]
            [clojure.data.zip.xml :refer [text xml-> xml1->]]
            [tramboard-clj.api.zvv :as zvv]
           ))

            
; this merges the two results from SBB and VBL
;  If SBB has realtime, take that
; Maybe way too complicated...
(defn- hash-realtime-data [dept get-hash]
  (let [departure (dept :departure)]
    {(keyword (get-hash dept)) dept}))

(defn- combine-platform [x sbbentry]
  (if (and (not (nil? sbbentry)) (not (nil? (sbbentry :platform))) (nil? (x :platform)))
    (assoc-in x [:platform] (sbbentry :platform))
    x))

(defn- get-new-hashmap [main sbbhashmap get-hash] 
  (into {} (for [x (main :departures)
                 :let [sbbentry (sbbhashmap (keyword (get-hash x)))]]
             (if (or (nil? sbbentry) (nil? ((sbbentry :departure) :realtime)))
               {(keyword (get-hash x)) (combine-platform x sbbentry)}
               {(keyword (get-hash x)) sbbentry}))))

(defn combine-results [main sbb get-hash]
  (let [sbbhashmap (into {} (map #(hash-realtime-data % get-hash) (sbb :departures)))
        newhashmap (get-new-hashmap main sbbhashmap get-hash)
        meta (sbb :meta)
        ]
    {:meta (if (nil? meta) (main :meta) meta)
     :departures (map #(dissoc % :dt) (sort-by (juxt :dt :name) (vals (merge sbbhashmap newhashmap))) )}))

     
; TODO error handling
(defn do-api-call2 [url transform-fn url2 transform-fn2 get-hash]
  (let [response    (http/get url {:socket-timeout 2000 :conn-timeout 3000})
        response2   (http/get url2)]
    (combine-results (if (= 200 (:status @response)) (transform-fn (:body @response)) {:error (:status @response)}) (transform-fn2 (:body @response2)) get-hash)))

(defn do-api-call [url transform-fn]
  (let [response    (http/get url)]
    (transform-fn (:body @response))))

