(ns tramboard-clj.api.zvv
  (:require [cheshire.core :as json]
            [ring.util.codec :as codec]
            [clj-time.core :as t]
            [clj-time.format :as f]
            [clojure.string :as str]
            [org.httpkit.client :as http]))

(def query-stations-base-url        "http://online.fahrplan.zvv.ch/bin/ajax-getstop.exe/dny?start=1&tpl=suggest2json&REQ0JourneyStopsS0A=7&getstop=1&noSession=yes&REQ0JourneyStopsB=25&REQ0JourneyStopsS0G=")
(def station-base-url               "http://online.fahrplan.zvv.ch/bin/stboard.exe/dn?L=vs_stbzvv&boardType=dep&productsFilter=1:1111111111111111&additionalTime=0&disableEquivs=false&maxJourneys=40&start=yes&monitor=1&requestType=0&view=preview&input=")

(def zvv-timezone (t/time-zone-for-id "Europe/Zurich"))
(def zvv-date-formatter (f/with-zone (f/formatter "dd.MM.yy HH:mm") zvv-timezone))

(defn- zvv-parse-datetime [date time]
  (if (nil? time)
    nil
    (str (f/parse zvv-date-formatter (str date " " time)))))

(defn- sanitize [text]
  (reduce #(str/replace %1 (%2 0) (%2 1))
          text
          [["&nbsp;" " "] [#"S( )+" "S"] ["Bus " ""]]))

(defn- map-category [text]
  (case text
    "Trm-NF" "tram"
    "Trm"    "tram"
    "Tro"    "tram"
    "M"      "subway"
    "Bus"    "bus"
    "Bus-NF" "bus"
    "KB"     "bus"
    "ICB"    "bus"
    "N"      "bus"
    "S"      "s-train"
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

; TODO add 1 day to realtime if it is smaller than scheduled (scheduled 23h59 + 3min delay ...)
(defn- zvv-departure [zvv-journey]
  (let [colors          (vec (remove str/blank? (str/split (zvv-journey "lc") #" ")))
        zvv-date-parser (partial zvv-parse-datetime (zvv-journey "da"))
        departure-name  (sanitize (zvv-journey "pr"))]
    {:zvv_id (zvv-journey "id")
     :name departure-name
     :type (map-category (zvv-journey "productCategory"))
     :accessible (zvv-journey "isNF")
     :colors {:fg (when (> (count colors) 0) (str "#" (colors 0)))
              :bg (when (> (count colors) 1) (str "#" (colors 1)))}
     :to (str/trim (zvv-journey "st"))
     :departure {:scheduled (zvv-date-parser (zvv-journey "ti"))
                 :realtime (zvv-date-parser (get-in zvv-journey ["rt" "dlt"]))}}))

; TODO tests (=> capture some data from zvv api)
(defn- transform-station-response [response-body]
  (let [unparsed   (clojure.string/replace-first response-body "journeysObj = " "")
        replace-bs (clojure.string/replace (clojure.string/replace unparsed "{label:" "{\"label\":") ",url:" ",\"url\":")
        data       (json/parse-string replace-bs)
        journeys   (data "journey")]
    {:meta {:station_id (data "stationEvaId")
            :station_name (data "stationName")}
     :departures (map zvv-departure journeys)}))

(defn- to-coordinate [string]
  (if (nil? string) nil
    (double (/ (read-string string) 1000000))))

(defn- zvv-station [zvv-station]
  (let [id nil]
    {:id    (zvv-station "extId")
     :name  (zvv-station "value")
     :location {:lat (to-coordinate (zvv-station "ycoord")) :lng (to-coordinate (zvv-station "xcoord"))}}))

(defn- transform-query-stations-response [response-body]
  (let [unparsed (reduce #(clojure.string/replace-first %1 %2 "") response-body [";SLs.showSuggestion();" "SLs.sls="])
        data     (json/parse-string unparsed)
        stations (data "suggestions")]
    {:stations (map zvv-station (remove #(or (nil? (% "extId")) (not= "1" (% "type"))) stations))}))

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
