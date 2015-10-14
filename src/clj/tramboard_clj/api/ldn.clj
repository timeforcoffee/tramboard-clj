(ns tramboard-clj.api.ldn
  (:require [ring.util.codec :as codec]
            [clj-time.core :as t]
            [clj-time.format :as f]
            [clojure.string :as str]
            [cheshire.core :as json]
            [org.httpkit.client :as http])
  (:import (java.net URLEncoder)))


(def app-key "")
(def app-id "")

(defn station-base-url [query]               
  (str "https://api.tfl.gov.uk/StopPoint/search?query=" (URLEncoder/encode query "UTF-8") "&modes=bus,tube,tram,cable-car&faresOnly=dalse&maxResults=100&app_id=" app-id "&app_key=" app-key))

(defn board-url [id]
  (str "https://api.tfl.gov.uk/StopPoint/" id "/arrivals?app_id=" app-id "&app_key=" app-key))

(def ldn-timezone (t/time-zone-for-id "Europe/London"))
(def ldn-date-formatter-1 (f/with-zone (f/formatter "yyyy-MM-dd'T'HH:mm:ssZ") ldn-timezone))
(def ldn-date-formatter-2 (f/with-zone (f/formatter "yyyy-MM-dd'T'HH:mm:ss.SSSZ") ldn-timezone))

(defn- ldn-parse-datetime [timestamp]
  (if (nil? timestamp)
    nil
    (let [formatter (if (> (count timestamp) 20) ldn-date-formatter-2 ldn-date-formatter-1)]
    (str (t/to-time-zone (f/parse formatter timestamp) (t/time-zone-for-id "Europe/Zurich"))))))

; (def stations [
;                {:id "WLO" :name "Waterloo" :lines ["B" "J" "N" "W"]}
;                ])

(defn- map-category [text]
  (case text
    "bus"  "bus"
    "tube" "subway"
    "bus"))

(defn- ldn-departures [arrival]
  {:name (arrival "lineId")
   :to   (arrival "destinationName")
   :type (map-category (arrival "modeName"))
   :departure (let [timestamp (ldn-parse-datetime (arrival "expectedArrival"))]
                {:scheduled timestamp
                 :realtime timestamp})})

; TODO tests (=> capture some data from zvv api)
(defn- transform-station-response [response-body]
  (println response-body)
  (let [data           (json/parse-string response-body)]
    {:meta {:station_id "test"}
     :departures (map ldn-departures data)}
))

(defn- ldn-station [station]
  {:id   (station "stationId")
   :name (str (station "name") " towards " (station "towards"))
   :location {:lat (station "lat")
              :lng (station "lon")}})

(defn- transform-query-stations-response [response-body]
  (let [data     (json/parse-string response-body)
        stations (data "matches")]
    {:stations (map ldn-station (remove #(= (% "towards") nil) stations))}))

; TODO error handling
(defn- do-api-call [url transform-fn]
  (let [response    (http/get url)]
    (transform-fn (:body @response))))

; TODO error handling
(defn station [id]
  (let [request-url (board-url id)]
    (do-api-call request-url transform-station-response)))

(defn query-stations [query]
  (let [request-url (station-base-url query)]
    (do-api-call request-url transform-query-stations-response)))
