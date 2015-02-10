(ns tramboard-clj.core.zvv
  (:require [cheshire.core :as json]
            [ring.util.codec :as codec]
            [clj-time.core :as t]
            [clj-time.format :as f]
            [clojure.string :as str]
            [org.httpkit.client :as http]))

;(def http-options {:timeout 200             ; ms
;              :basic-auth ["user" "pass"]
;              :query-params {:param "value" :param2 ["value1" "value2"]}
;              :user-agent "User-Agent-string"
;              :headers {"X-Header" "Value"}})

(def query-stations-base-url        "http://online.fahrplan.zvv.ch/bin/ajax-getstop.exe/dny?start=1&tpl=suggest2json&REQ0JourneyStopsS0A=7&getstop=1&noSession=yes&REQ0JourneyStopsB=25&REQ0JourneyStopsS0G=")
(def station-base-url               "http://online.fahrplan.zvv.ch/bin/stboard.exe/dn?L=vs_stbzvv&boardType=dep&productsFilter=1:1111111111111111&additionalTime=0&disableEquivs=false&maxJourneys=30&start=yes&monitor=1&requestType=0&view=preview&input=")

(def zvv-timezone (t/time-zone-for-id "Europe/Zurich"))

(def zvv-date-formatter (f/with-zone (f/formatter "dd.MM.yy HH:mm") zvv-timezone))

(defn zvv-parse-datetime [date time]
  (if (nil? time)
    nil
    (str (f/parse zvv-date-formatter (str date " " time)))))

(defn sanitize [text]
  (str/replace (str/replace text "&nbsp;" " ") #"S( )+" "S"))

(defn map-category [text]
  (case text
    "Trm-NF" "tram"
    "Trm"    "tram"
    "Tro"    "tram"
    "M"      "subway"
    "Bus"    "bus"
    "Bus-NF" "bus"
    "KB"     "bus"
    "ICB"    "bus"
    "S"      "train"
    "ICN"    "train"
    "IC"     "train"
    "IR"     "train"
    "RE"     "train"
    "R"      "train"
    "EC"     "train"
    "TER"    "train"
    "ICE"    "train"
    "BEX"    "train"
    "SLB"    "train"
    "LSB"    "train"
    "D"      "train"
    "VAE"    "train"
    "ATZ"    "train"
    "TGV"    "train"
    "RB"     "train"
    "TX"     "taxi"
    "Schiff" "boat"
    "Fun"    "rack-train"
    "GB"     "cable-car"

    "train"))

(defn map-accessible [text]
  (case text
    "Trm-NF" true
    "Bus-NF" true
    false))

; TODO add 1 day to realtime if it is smaller than scheduled (scheduled 23h59 + 3min delay ...)
(defn zvv-departure [zvv-journey]
  (let [colors          (vec (remove str/blank? (str/split (zvv-journey "lc") #" ")))
        zvv-date-parser (partial zvv-parse-datetime (zvv-journey "da"))]
    {;:meta zvv-journey
     :zvv_id (zvv-journey "id")
     :name (sanitize (zvv-journey "pr"))
     :type (map-category (zvv-journey "productCategory"))
     :accessible (map-accessible (zvv-journey "productCategory"))
     :colors {:fg (when (> (count colors) 0) (str "#" (colors 0)))
              :bg (when (> (count colors) 1) (str "#" (colors 1)))}
     :to (zvv-journey "st")
     :departure {:scheduled (zvv-date-parser (zvv-journey "ti"))
                 :realtime (zvv-date-parser (get-in zvv-journey ["rt" "dlt"]))}}))

; TODO tests (=> capture some data from zvv api)
(defn transform-station-response [response-body]
  ;(spit "fixtures/zvv_responses/new.txt" response-body)
  (let [unparsed (clojure.string/replace-first response-body "journeysObj = " "")
        data     (json/parse-string unparsed)
        journeys (data "journey")]
    {:meta {:station_id (data "stationEvaId")
            :station_name (data "stationName")}
     :departures (map zvv-departure journeys)}))

(defn zvv-station [zvv-station]
  (let [id nil]
    {:id    (zvv-station "extId")
     :name  (zvv-station "value")}))

(defn transform-query-stations-response [response-body]
  (let [unparsed (reduce #(clojure.string/replace-first %1 %2 "") response-body [";SLs.showSuggestion();" "SLs.sls="])
        data     (json/parse-string unparsed)
        stations (data "suggestions")]
    {:stations (map zvv-station (remove #(or (nil? (% "extId")) (not= "1" (% "type"))) stations))}))

; TODO error handling
(defn do-api-call [url transform-fn]
  (let [response    (http/get url)]
    (transform-fn (:body @response))))

(defn station [id]
  (let [request-url (str station-base-url id)]
    (do-api-call request-url transform-station-response)))

(defn query-stations [query]
  (let [request-url (str query-stations-base-url (codec/url-encode query))]
    (do-api-call request-url transform-query-stations-response)))

