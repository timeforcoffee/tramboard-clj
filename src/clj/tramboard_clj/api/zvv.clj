(ns tramboard-clj.api.zvv
  (:require [cheshire.core :as json]
            [ring.util.codec :as codec]
            [clj-time.core :as t]
            [clj-time.format :as f]
            [clojure.string :as str]
            [org.httpkit.client :as http]
            [clojure.tools.html-utils :as html]))

(def query-stations-base-url "http://online.fahrplan.zvv.ch/bin/ajax-getstop.exe/dny?start=1&tpl=suggest2json&REQ0JourneyStopsS0A=7&getstop=1&noSession=yes&REQ0JourneyStopsB=25&REQ0JourneyStopsS0G=")
(def station-base-url        "http://online.fahrplan.zvv.ch/bin/stboard.exe/dny?dirInput=&maxJourneys=100&boardType=dep&start=1&tpl=stbResult2json&input=")

(def zvv-timezone (t/time-zone-for-id "Europe/Zurich"))
(def zvv-date-formatter (f/with-zone (f/formatter "dd.MM.yy HH:mm") zvv-timezone))

(defn- sanitize [text]
  (reduce #(str/replace %1 (%2 0) (%2 1))
          text
          [["&nbsp;" " "] [#"S( )+" "S"] ["Bus " ""]]))

(defn- map-category [text]
  (case text
    "icon_tram"  "tram"
    "icon_train" "train"
    "icon_bus"   "bus"
    "icon_boar"  "boat"

    ;"M"      "subway"
    ;"TX"     "taxi"
    ;"Fun"    "rack-train"
    ;"GB"     "cable-car"

    "train"))

(defn- format-date [date time]
  (str (f/parse zvv-date-formatter (str date " " time))))

(defn- zvv-date [input]
  (let [date (input "date")
        time (input "time")]
    (when (not (or (empty? date) (empty? time)))
      (format-date date time))))

; TODO add 1 day to realtime if it is smaller than scheduled (scheduled 23h59 + 3min delay ...)
(defn- zvv-departure [zvv-journey]
  (let [product         (zvv-journey "product")
        main-location   (zvv-journey "mainLocation")
        color           (product "color")
        line            (or (product "line") (product "name"))
        platform        (main-location "platform")
        attributes-bfr  (zvv-journey "attributes_bfr")]
    {:name (sanitize line)
     :type (map-category (product "icon"))
     :accessible (not (empty? (filter #(contains? #{"6" "9"} (% "code")) attributes-bfr)))
     :colors {:fg (str "#" (color "fg"))
              :bg (str "#" (color "bg"))}
     :to (html/xml-decode (product "direction"))
     :platform (if (= platform "") nil platform)
     :departure {:scheduled (zvv-date main-location)
                 :realtime (zvv-date (main-location "realTime"))}}))

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
