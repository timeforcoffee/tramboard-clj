(ns tramboard-clj.core.zvv
  (:require [cheshire.core :as json]
            [clj-time.core :as t]
            [clj-time.format :as f]
            [org.httpkit.client :as http]))

;(def http-options {:timeout 200             ; ms
;              :basic-auth ["user" "pass"]
;              :query-params {:param "value" :param2 ["value1" "value2"]}
;              :user-agent "User-Agent-string"
;              :headers {"X-Header" "Value"}})

(def base-url "http://online.fahrplan.zvv.ch/bin/stboard.exe/dn?L=vs_stbzvv&boardType=dep&productsFilter=1:1111111111111111&additionalTime=0&disableEquivs=false&maxJourneys=18&start=yes&monitor=1&requestType=0&view=preview&input=")

(def zvv-timezone (t/time-zone-for-id "Europe/Zurich"))

(def zvv-date-formatter (f/with-zone (f/formatter "dd.MM.yy HH:mm") zvv-timezone))

(defn zvv-parse-datetime [date time]
  (if (nil? time)
    nil
    (str (f/parse zvv-date-formatter (str date " " time)))))

; TODO add 1 day to realtime if it is smaller than scheduled (scheduled 23h59 + 3min delay ...)
(defn departure [zvv-journey]
  (let [colors          (clojure.string/split (zvv-journey "lc") #" ")
        zvv-date-parser (partial zvv-parse-datetime (zvv-journey "da"))]
    {;:meta zvv-journey
     :zvv_id (zvv-journey "id")
     :name (zvv-journey "pr")
     :type (zvv-journey "productCategory")
     :colors {:fg (str "#" (colors 0))
              :bg (str "#" (colors 1))}
     :to (zvv-journey "st")
     :departure {:scheduled (zvv-date-parser (zvv-journey "ti")) :realtime (zvv-date-parser (get-in zvv-journey ["rt" "dlt"]))}}))

; TODO read id from response ?
; TODO tests (=> capture some data from zvv api)
(defn transform-response [id response-body]
  (let [unparsed (clojure.string/replace-first response-body "journeysObj = " "")
        data     (json/parse-string unparsed)
        journeys (data "journey")]
    {:meta {:station_id id :station_name (data "stationName")} :departures (map departure journeys)}))

; TODO error handling
(defn station [id]
  (let [request-url (str base-url id)
        response    (http/get request-url)]
        (transform-response id (:body @response)))
