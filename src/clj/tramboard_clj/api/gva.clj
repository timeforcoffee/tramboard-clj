(ns tramboard-clj.api.gva
  (:require [ring.util.codec :as codec]
            [clj-time.core :as t]
            [clj-time.format :as f]
            [cheshire.core :as json]
            [org.httpkit.client :as http]))

(def query-stations-base-url        "http://rtpi.data.tpg.ch/v1/GetStops?key=21a25080-9bbc-11e4-bc99-0002a5d5c51b&stopName=")
(def station-base-url               "http://rtpi.data.tpg.ch/v1/GetNextDepartures?key=21a25080-9bbc-11e4-bc99-0002a5d5c51b&stopCode=")

(def line-colors-url "http://rtpi.data.tpg.ch/v1/GetLinesColors?key=21a25080-9bbc-11e4-bc99-0002a5d5c51b")

(def gva-timezone (t/time-zone-for-id "Europe/Zurich"))
(def gva-date-formatter (f/with-zone (f/formatter "yyyy-MM-dd'T'HH:mm:ssZ") gva-timezone))

(defn- gva-parse-datetime [timestamp]
  (if (nil? timestamp)
    nil
    (str (f/parse gva-date-formatter timestamp))))

; (defn- map-category [text]
;   (case text
;     "Trm-NF" "tram"
;     "Trm"    "tram"
;     "Tro"    "tram"
;     "M"      "subway"
;     "Bus"    "bus"
;     "Bus-NF" "bus"
;     "KB"     "bus"
;     "ICB"    "bus"
;     "N"      "bus"
;     "S"      "s-train"
;     "ICN"    "train"
;     "IC"     "train"
;     "IR"     "train"
;     "RE"     "train"
;     "R"      "train"
;     "EC"     "train"
;     "TER"    "train"
;     "ICE"    "train"
;     "BEX"    "train"
;     "SLB"    "train"
;     "LSB"    "train"
;     "D"      "train"
;     "VAE"    "train"
;     "ATZ"    "train"
;     "TGV"    "train"
;     "RB"     "train"
;     "TX"     "taxi"
;     "Schiff" "boat"
;     "Fun"    "rack-train"
;     "GB"     "cable-car"

;     "train"))

(defn- gva-departure [gva-journey]
  (let [timestamp (gva-parse-datetime (gva-journey "timestamp"))]
  {:type "train"
   :name ((gva-journey "line") "lineCode")
   :accessible (= (gva-journey "characteristics") "PMR")
   :colors nil
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

; (defn- to-coordinate [string]
;   (if (nil? string) nil
;     (double (/ (read-string string) 1000000))))

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

(defn station [id]
  (let [request-url (str station-base-url id)]
    (do-api-call request-url transform-station-response)))

(defn query-stations [query]
  (let [request-url (str query-stations-base-url (codec/url-encode query))]
    (do-api-call request-url transform-query-stations-response)))
