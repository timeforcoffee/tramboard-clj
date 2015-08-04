(ns tramboard-clj.api.zvv
  (:require [cheshire.core :as json]
            [ring.util.codec :as codec]
            [clj-time.core :as t]
            [clj-time.format :as f]
            [clojure.string :as str]
            [org.httpkit.client :as http]
            [clojure.tools.html-utils :as html]))

(def query-stations-base-url "http://online.fahrplan.zvv.ch/bin/ajax-getstop.exe/dny?start=1&tpl=suggest2json&REQ0JourneyStopsS0A=7&getstop=1&noSession=yes&REQ0JourneyStopsB=25&REQ0JourneyStopsS0G=")
(def station-base-url        "http://online.fahrplan.zvv.ch/bin/stboard.exe/dny?dirInput=&maxJourneys=10&boardType=dep&start=1&tpl=stbResult2json&input=")

(def zvv-timezone (t/time-zone-for-id "Europe/Zurich"))
(def zvv-date-formatter (f/with-zone (f/formatter "dd.MM.yy HH:mm") zvv-timezone))

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

(defn- zvv-date [input]
  (str/trim (str (input "date")
                 " "
                 (input "time"))))

; TODO add 1 day to realtime if it is smaller than scheduled (scheduled 23h59 + 3min delay ...)
(defn- zvv-departure [zvv-journey]
  (let [product         (zvv-journey "product")
        main-location   (zvv-journey "mainLocation")
        color           (product "color")]

    {:name (sanitize (product "line"))
     ;:type (map-category (zvv-journey "productCategory"))
     ;:accessible (zvv-journey "isNF")
     :colors {:fg (str "#" (color "fg"))
              :bg (str "#" (color "bg"))}
     :to (html/xml-decode (product "direction"))
     :departure {:scheduled (str (f/parse zvv-date-formatter (zvv-date main-location)))
                 :realtime (str (f/parse zvv-date-formatter (zvv-date (main-location "realTime"))))}}))

; TODO tests (=> capture some data from zvv api)
(defn- transform-station-response [id]
  (fn [response-body]
    (let [data        (json/parse-string response-body)]
      {:meta {:station_id   id
              :station_name (data ["station" "name"])}
       :departures (map zvv-departure (data "connections"))})))

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
    (do-api-call request-url (transform-station-response id))))

(defn query-stations [query]
  (let [request-url (str query-stations-base-url (codec/url-encode query))]
    (do-api-call request-url transform-query-stations-response)))
