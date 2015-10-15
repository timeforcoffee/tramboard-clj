(ns tramboard-clj.api.vbl
  (:require [ring.util.codec :as codec]
            [clj-time.core :as t]
            [clj-time.format :as f]
            [cheshire.core :as json]
            [org.httpkit.client :as http]
            [clojure.xml :as xml]
            [clojure.zip :as zip]
            [clojure.data.zip.xml :refer [text xml-> xml1->]]
            [tramboard-clj.api.zvv :as zvv]
            [digest] 
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
    "Voralpen-Express" "train"
    "EuroCity" "train"
    "InterRegio" "train"
    "Trolleybus" "bus"
    "train"))

(defn- name-category [text default]
  (case text
    "InterCityNeigezug" "ICE"
    "Regional-Express" "RE"
    "InterRegio" "IR"
    "Voralpen-Express" "VAE"
    "EuroCity" "EC"
    default))    
    
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

(defn- get-hash [dept] 
    (str "t" (digest/md5 (str (subs (dept :to) 1 3) (dept :name)((dept :departure) :scheduled)))))

(defn- hash-realtime-data [dept]
    (let [departure (dept :departure)]
    (if (nil? (departure :realtime))
        nil
        {(keyword (get-hash dept)) dept}
        )))
 
(defn- combine-results [main sbb]
    (let [sbbhashmap (into {} (reduce into (map hash-realtime-data (sbb :departures))))]
    {:meta (main :meta)
     :departures 
        (for [x (main :departures)
            :let [sbbentry (sbbhashmap (keyword (get-hash x)))]]
            (if (nil? sbbentry)
                x
                sbbentry
                ))}))
    
; TODO error handling
(defn- do-api-call2 [url transform-fn url2 transform-fn2]
  (let [response    (http/get url)
        response2   (http/get url2)]
    (combine-results (transform-fn (:body @response)) (transform-fn2 (:body @response2)))))

(defn- do-api-call [url transform-fn]
  (let [response    (http/get url)]
     (transform-fn (:body @response))))

; TODO error handling
(defn station [id sbbid]
  (let [request-url (str station-base-url id)
        request-url-sbb (str zvv/station-base-url sbbid)]
        (if (nil? sbbid)
            (do-api-call request-url transform-station-response)
            (do-api-call2 request-url transform-station-response  request-url-sbb (zvv/transform-station-response sbbid)))))

(defn query-stations [query]
  (let [request-url (str query-stations-base-url (codec/url-encode query))]
    (do-api-call request-url transform-query-stations-response)))
