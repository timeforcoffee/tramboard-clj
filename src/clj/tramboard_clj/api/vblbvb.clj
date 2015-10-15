(ns tramboard-clj.api.vblbvb
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

(def vbl-timezone (t/time-zone-for-id "Europe/Zurich"))
(def vbl-date-formatter (f/with-zone (f/formatter "dd.MM.YYYYHH:mm") vbl-timezone))

(defn- vbl-parse-datetime [timestamp]
  (if (or (nil? timestamp) (= "" timestamp))
    nil
    (str (f/parse vbl-date-formatter timestamp))))


(defn zip-str [s]
  (zip/xml-zip 
  (try
    (xml/parse (java.io.ByteArrayInputStream. (.getBytes s)))
    (catch Exception e {:error"xml parse error"})))
    )  
      

; if the hash making fails due to too different names, fix it here
(defn- map-station-name [text]
  (case text
    "Basel St-Louis Grenze" "St-Louis Grenze"
    text))
    
(defn- map-category [text]
  (case text
    "Bus" "bus"
    "S-Bahn" "train"
    "InterCityNeigezug" "train"
    "Regional-Express" "train"
    "Voralpen-Express" "train"
    "InterCityExpress" "train"
    "InterCityNight" "train"
    "EuroCity" "train"
    "InterCity" "train"
    "InterRegio" "train"
    "Trolleybus" "bus"
    "Schiff" "ship"
    "Tram BLT" "tram"
    "Tram BVB" "tram"
    "Bus BVB" "bus"
    "train"))

(defn- name-category [text default]
  (case text
    "InterCityNeigezug" "ICN"
    "InterCityNight" "ICN"
    "InterCityExpress" "ICE"
    "Regional-Express" "RE"
    "InterRegio" "IR"
    "Voralpen-Express" "VAE"
    "EuroCity" "EC"
    "InterCity" "IC"
    (if (= default "") text default)))    
    
(defn- vbl-departure [vbl-journey]
  (let [timestamp  (vbl-parse-datetime (str (xml1-> vbl-journey :dt :da text) (xml1-> vbl-journey :dt :t text)))
        timestamprt  
            (if (= "0" (xml1-> vbl-journey :realtime text))
                nil
                (vbl-parse-datetime (str (xml1-> vbl-journey :dt :rda text) (xml1-> vbl-journey :dt :rt text)))
                )
        line-code  (xml1-> vbl-journey :m :nu text)
        line-code-type (xml1-> vbl-journey :m :n text)
        line-color "#000000"]
    {:type (map-category line-code-type)
     :name (name-category line-code-type line-code)
     :accessible false
     :colors {:fg "#000000" :bg "#FFFFFF"}
     :to (xml1-> vbl-journey :m :des text)
     :platform (xml1-> vbl-journey :r :pl text)
     :departure {:scheduled timestamp
                 :realtime timestamprt}}))

; TODO tests (=> capture some data from zvv api)
(defn- transform-station-response [response-body]
  (let [data           (zip-str (clojure.string/replace  response-body "encoding=\"ISO-8859-1\"" ""))
        journeys       (xml-> data :dps :dp)
        station        (xml1-> data :dps :dp)]
    ; {:meta data}
    {:meta {:station_id (xml1-> station :r :id text )
            :station_name (xml1-> station :n text )}
     :departures (map vbl-departure  journeys)}
    ))

(defn- vbl-station [vbl-station]
  {:id    (xml1-> vbl-station :r :id text )
   :name  (str (str (xml1-> vbl-station :r :pc text ) ", ") (xml1-> vbl-station :n text ))})

(defn- transform-query-stations-response [response-body]
  (let [stations (zip-str (clojure.string/replace  response-body "encoding=\"ISO-8859-1\"" ""))]
    {:stations (map vbl-station (xml-> stations :sf :p))}))

(defn- hash-realtime-data [dept get-hash]
    (let [departure (dept :departure)]
        {(keyword (get-hash dept)) dept}
        ))

; this merges the two results from SBB and VBL
;  If SBB has realtime, take that
; Maybe way too complicated...

(defn- combine-platform [x sbbentry]
 (if (and (not (nil? sbbentry)) (not (nil? (sbbentry :platform))) (nil? (x :platform)))
    (assoc-in x [:platform] (sbbentry :platform))
     x
))

(defn- get-new-hashmap [main sbbhashmap get-hash] 
    (into {} (for [x (main :departures)
            :let [sbbentry (sbbhashmap (keyword (get-hash x)))]]
            (if (or (nil? sbbentry) (nil? ((sbbentry :departure) :realtime)))
                {(keyword (get-hash x)) (combine-platform x sbbentry)}
                {(keyword (get-hash x)) sbbentry}
                ))))

(defn- combine-results [main sbb get-hash]
    (let [sbbhashmap (into {} (map #(hash-realtime-data % get-hash) (sbb :departures)))
          newhashmap (get-new-hashmap main sbbhashmap get-hash)
          meta (sbb :meta)
          ]
    {:meta (if (nil? meta) (main :meta) meta)
     :departures (vals (merge sbbhashmap newhashmap))}))
    
; TODO error handling
(defn- do-api-call2 [url transform-fn url2 transform-fn2 get-hash]
  (let [response    (http/get url {:socket-timeout 2000 :conn-timeout 3000})
        response2   (http/get url2)]
    (combine-results (if (= 200 (:status @response)) (transform-fn (:body @response)) {:error (:status @response)}) (transform-fn2 (:body @response2)) get-hash)))

(defn- do-api-call [url transform-fn]
  (let [response    (http/get url)]
     (transform-fn (:body @response))))

; TODO error handling
(defn station [id sbbid request-url get-hash]
  (let [request-url-sbb (str zvv/station-base-url sbbid)]
        (if (nil? sbbid)
            (do-api-call request-url transform-station-response)
            (do-api-call2 request-url transform-station-response  request-url-sbb (zvv/transform-station-response sbbid) get-hash))))

(defn query-stations [query request-url]
    (do-api-call request-url transform-query-stations-response))
