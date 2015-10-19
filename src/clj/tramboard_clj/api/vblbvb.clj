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
            [tramboard-clj.api.common :as c]))

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
      (catch Exception e {:error"xml parse error"}))))  


; if the hash making fails due to too different names, fix it here
(defn map-station-name [text]
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
     :dt (or timestamprt timestamp)
     :departure {:scheduled timestamp
                 :realtime timestamprt}}))

; TODO tests (=> capture some data from zvv api)
(defn- transform-station-response [response-body]
  (let [data           (zip-str (clojure.string/replace  response-body "encoding=\"ISO-8859-1\"" ""))
        journeys       (xml-> data :dps :dp)
        station        (xml1-> data :dps :dp)]
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

; TODO error handling
(defn station [id sbbid request-url get-hash]
  (let [request-url-sbb (str zvv/station-base-url sbbid)]
    (if (nil? sbbid)
      (c/do-api-call request-url transform-station-response)
      (c/do-api-call2 request-url transform-station-response  request-url-sbb (zvv/transform-station-response sbbid) get-hash))))

(defn query-stations [query request-url]
  (c/do-api-call request-url transform-query-stations-response))
