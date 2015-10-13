(ns tramboard-clj.api.vbl
  (:require [ring.util.codec :as codec]
            [clj-time.core :as t]
            [clj-time.format :as f]
            [cheshire.core :as json]
            [org.httpkit.client :as http]
            [clojure.xml :as xml]
            [clojure.zip :as zip]
           [clojure.data.zip.xml :refer [text xml-> xml1->]]
          ))

(def query-stations-base-url        "http://mobil.vbl.ch/vblUltra/XML_STOPFINDER_REQUEST?anyMaxSizeHitList=30&coordOutputFormat=MRCV&type_sf=any&locationServerActive=1&anyObjFilter_sf=42&name_sf=")
(def station-base-url               "http://mobil.vbl.ch/vblUltra/XML_DM_REQUEST?type_dm=any&trITMOTvalue100=10&changeSpeed=normal&mergeDep=1&coordOutputFormat=MRCV&coordListOutputFormat=STRING&useAllStops=1&excludedMeans=checkbox&useRealtime=1&itOptionsActive=1&canChangeMOT=0&mode=direct&ptOptionsActive=1&imparedOptionsActive=1&depType=stopEvents&locationServerActive=1&maxTimeLoop=2&includeCompleteStopSeq=0&useProxFootSearch=0&name_dm=")

(def vbl-timezone (t/time-zone-for-id "Europe/Zurich"))
(def vbl-date-formatter (f/with-zone (f/formatter "dd.MM.YYYYHH:mm") vbl-timezone))

(defn- vbl-parse-datetime [timestamp]
  (if (nil? timestamp)
    nil
    (str (f/parse vbl-date-formatter timestamp))))


(defn zip-str [s]
  (zip/xml-zip 
      (xml/parse (java.io.ByteArrayInputStream. (.getBytes s)))))
    
    
(defn- map-category [text]
  (case text
    "Bus" "bus"
    "S-Bahn" "train"
    "InterCityNeigezug" "train"
    "Regional-Express" "train"
    "InterRegio" "train"
    "Trolleybus" "bus"
    "train"))

(defn- vbl-departure [vbl-journey]
  (let [timestamp  (vbl-parse-datetime (str (xml1-> vbl-journey :dt :da text) (xml1-> vbl-journey :dt :t text)))
        timestamprt  
            (if (= "0" (xml1-> vbl-journey :realtime text))
                nil
                (vbl-parse-datetime (str (xml1-> vbl-journey :dt :rda text) (xml1-> vbl-journey :dt :rt text)))
                )
        line-code  (xml1-> vbl-journey :m :nu text)
        line-color "#000000"]
    {:type (map-category (xml1-> vbl-journey :m :n text))
     :name (xml1-> vbl-journey :m :nu text)
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

; TODO error handling
(defn- do-api-call [url transform-fn]
  (let [response    (http/get url)]
    (transform-fn (:body @response))))

; TODO error handling
(defn station [id]
  (let [request-url (str station-base-url id)]
    (do-api-call request-url transform-station-response)))

(defn query-stations [query]
  (let [request-url (str query-stations-base-url (codec/url-encode query))]
    (do-api-call request-url transform-query-stations-response)))
