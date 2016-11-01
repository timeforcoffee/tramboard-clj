(ns tramboard-clj.api.gva
  (:require [ring.util.codec :as codec]
            [clj-time.core :as t]
            [clj-time.format :as f]
            [cheshire.core :as json]
            [org.httpkit.client :as http]))

(def query-stations-base-url        "http://prod.ivtr-od.tpg.ch/v1/GetStops?key=21a25080-9bbc-11e4-bc99-0002a5d5c51b&stopName=")
(def station-base-url               "http://prod.ivtr-od.tpg.ch/v1/GetNextDepartures?key=21a25080-9bbc-11e4-bc99-0002a5d5c51b&stopCode=")

(def line-colors-fetched (atom false))
(def line-colors-url "http://prod.ivtr-od.tpg.ch/GetLinesColors?key=21a25080-9bbc-11e4-bc99-0002a5d5c51b")
(def line-colors (promise))

(def gva-timezone (t/time-zone-for-id "Europe/Zurich"))
(def gva-date-formatter (f/with-zone (f/formatter "yyyy-MM-dd'T'HH:mm:ssZ") gva-timezone))

(defn- gva-parse-datetime [timestamp]
  (if (nil? timestamp)
    nil
    (str (f/parse gva-date-formatter timestamp))))

(def black-line-codes #{"Z" "F" "G" "Y" "D" "Dn" "M" "K" "T" "O" "19" "61" "12" "28" "4" "6" "34" "45" "43" "42" "53" "57" "72"})

(defn- map-category [text]
  (case text
    "ABA" "bus"
    "TW7" "tram"
    "TW6" "tram"
    "TBA" "bus"
    "bus"))

(defn- get-color [line-code]
  (get (deref line-colors) line-code))

(defn- gva-departure [gva-journey]
  (let [timestamp  (gva-parse-datetime (gva-journey "timestamp"))
        line-code  ((gva-journey "line") "lineCode")
        line-color (get-color line-code)]
    {:type (map-category (gva-journey "vehiculeType"))
     :name line-code
     :accessible (= (gva-journey "characteristics") "PMR")
     :colors {:fg (if (contains? black-line-codes line-code) "#000000" "#FFFFFF") :bg line-color}
     :to ((gva-journey "line") "destinationName")
     :departure {:scheduled timestamp
                 :realtime timestamp}}))

; TODO tests (=> capture some data from zvv api)
(defn- transform-station-response [response-body]
  (let [data           (json/parse-string response-body)
        journeys       (data "departures")
        station        (data "stop")]
    ; {:meta data}
    {:meta {:station_id (station "stopCode")
            :station_name (station "stopName")}
     :departures (map gva-departure (remove #(= (% "waitingTime") "no more") journeys))}
    ))

(defn- gva-station [gva-station]
  {:id    (gva-station "stopCode")
   :name  (gva-station "stopName")})

(defn- transform-query-stations-response [response-body]
  (let [data     (json/parse-string response-body)
        stations (data "stops")]
    {:stations (map gva-station stations)}))

; TODO error handling
(defn- do-api-call [url transform-fn]
  (let [response    (http/get url)]
    (transform-fn (:body @response))))

; TODO error handling
(defn station [id sbbid]
  (let [request-url (str station-base-url id)]
    (when (compare-and-set! line-colors-fetched false true)
      (http/get line-colors-url 
                {}
                (fn [{:keys [status headers body error]}] 
                  (if error
                    (println "Failed, exception is " error)
                    (let [data        (json/parse-string body)
                          colors      (data "colors")
                          colors-map  (into {} (map #(vector (% "lineCode") (str "#" (% "hexa"))) colors))]
                      (deliver line-colors colors-map))))))
    (do-api-call request-url transform-station-response)))

(defn query-stations [query]
  (let [request-url (str query-stations-base-url (codec/url-encode query))]
    (do-api-call request-url transform-query-stations-response)))
