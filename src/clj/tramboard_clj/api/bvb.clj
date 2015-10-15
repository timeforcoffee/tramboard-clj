(ns tramboard-clj.api.bvb
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

(def query-stations-base-url        "http://efa-bw.de/ios_bvb/XML_STOPFINDER_REQUEST?coordOutputFormat=NBWT&type_sf=any&locationServerActive=1&stateless=1&useHouseNumberList=true&doNotSearchForStops=1&reducedAnyWithoutAddressObjFilter_sf=103&reducedAnyPostcodeObjFilter_sf=64&reducedAnyTooManyObjFilter_sf=2&anyObjFilter_sf=126&anyMaxSizeHitList=600&w_regPrefAl=2&prMinQu=1&name_sf=")
(def station-base-url               "http://efa-bw.de/ios_bvb/XML_DM_REQUEST?type_dm=any&trITMOTvalue100=10&changeSpeed=normal&mergeDep=1&coordOutputFormat=NBWT&coordListOutputFormat=STRING&useAllStops=1&excludedMeans=checkbox&useRealtime=1&itOptionsActive=1&canChangeMOT=0&mode=direct&ptOptionsActive=1&imparedOptionsActive=1&depType=stopEvents&locationServerActive=1&useProxFootSearch=0&maxTimeLoop=2&includeCompleteStopSeq=0&name_dm=")

(def vbl-timezone (t/time-zone-for-id "Europe/Zurich"))
(def vbl-date-formatter (f/with-zone (f/formatter "dd.MM.YYYYHH:mm") vbl-timezone))

(defn- vbl-parse-datetime [timestamp]
  (if (nil? timestamp)
    nil
    (str (f/parse vbl-date-formatter timestamp))))


(defn zip-str [s]
  (zip/xml-zip 
      (xml/parse (java.io.ByteArrayInputStream. (.getBytes s)))))
    
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

(defn- get-hash [dept] 
    (str "t" (digest/md5 (str (subs (clojure.string/replace (map-station-name (dept :to)) "^Basel " "" ) 1 3) (dept :name)((dept :departure) :scheduled)))))

(defn- hash-realtime-data [dept]
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

(defn- get-new-hashmap [main sbbhashmap] 
    (into {} (for [x (main :departures)
            :let [sbbentry (sbbhashmap (keyword (get-hash x)))]]
            (if (or (nil? sbbentry) (nil? ((sbbentry :departure) :realtime)))
                {(keyword (get-hash x)) (combine-platform x sbbentry)}
                {(keyword (get-hash x)) sbbentry}
                ))))

(defn- combine-results [main sbb]
    (let [sbbhashmap (into {} (map hash-realtime-data (sbb :departures)))
          newhashmap (get-new-hashmap main sbbhashmap)]
    {:meta (main :meta)
     :departures (vals (merge sbbhashmap newhashmap))}))
    
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
