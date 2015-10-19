(ns tramboard-clj.api.wml
  (:require [cheshire.core :as json]
            [ring.util.codec :as codec]
            [clj-time.core :as t]
            [clj-time.format :as f]
            [clojure.string :as str]
            [org.httpkit.client :as http]
            [clojure.tools.html-utils :as html]))

             
(def wml-formatter (f/with-zone (f/formatter "yyyyMMdd'T'HHmm") blt-timezone))

(def query-stations-base-url "http://online.fahrplan.zvv.ch/bin/ajax-getstop.exe/dny?start=1&tpl=suggest2json&REQ0JourneyStopsS0A=7&getstop=1&noSession=yes&REQ0JourneyStopsB=25&REQ0JourneyStopsS0G=")
(def station-base-url        (str "http://data.wemlin.com/rest/v0/networks/blt/stations/DI-0000{{id}}/"  (f/unparse wml-formatter (t/now)) "/"  (f/unparse wml-formatter (t/plus (t/now) (t/hours 2)))))


(def wml-timezone (t/time-zone-for-id "Europe/Zurich"))
(def wml-date-formatter (f/with-zone (f/formatter "yyyyMMdd'T'HHmmss") wml-timezone))

(defn- wml-parse-datetime [timestamp]
  (if (nil? timestamp)
    nil
    (str (-> (f/parse wml-date-formatter timestamp) .secondOfMinute .withMinimumValue))))

(defn hexy
"This will convert the bytes to CSS RGB Value"
  ([x] (hexy (nth x 0) (nth x 1) (nth x 2)))
  ([r g b] (reduce str 
              (cons "#" 
                (map #(format "%02X" (bit-and 0xFF %)) [r g b])))))

; calculate luhn number for the ID call                
(defn str->ints [s]
  (map #(Character/digit % 10) s))

(defn double-every-second [coll]
  (map #(%1 %2)
       (cycle  [identity #(* % 2)])
       (reverse coll)))

(defn ints->digits [coll]
  (mapcat #(str->ints (str %)) coll))

(def add (partial reduce +))

(defn luhny? [s]
  (-> s
      str->ints
      double-every-second
      ints->digits
      add
      (mod 10)
      ))
      
(defn- add-luhny-digit [s] 
   (let [ diff (luhny? (str s "0"))
          digit (if (= diff 0) diff (- 10 diff))
   ]
   (str s "-" digit)
   )
)
      
(defn- map-category [text]
  (case text
    "NFB"  "bus"
    "train"))

(defn- format-date [date time]
  (str (f/parse wml-date-formatter (str date " " time))))

(defn- format-place [data]
  (str (str (data "place") ", ") (data "name")))
  
; TODO add 1 day to realtime if it is smaller than scheduled (scheduled 23h59 + 3min delay ...)
(defn- wml-departure [wml-journey]
  (let [product         (wml-journey "line")
        color           (product "colors")
        colorfg         (color "fg")
        colorbg         (color "bg")
        platform        (wml-journey "platform")
        line            (or (product "line") (product "name"))
        attributes-bfr  (wml-journey "attributes_bfr")]
    {:name (product "line_name")
     :type (map-category (product "transportMapping"))
     :accessible (not (empty? (filter #(contains? #{"6" "9"} (% "code")) attributes-bfr)))
     :colors {:fg (hexy colorfg)
              :bg (hexy colorbg)
            }
     :to (format-place (wml-journey "end_station"))
     :platform (if (= platform "") nil platform)
     :departure {:scheduled (wml-parse-datetime (wml-journey "iso8601_time_sec"))
                 :realtime (if (true? (wml-journey "real_time")) 
                                (wml-parse-datetime (wml-journey "iso8601_real_time_sec"))
                                nil
                                )
                 }}))

; TODO tests (=> capture some data from blt api)
(defn- transform-station-response [id]
  (fn [response-body]
    (let [data        (json/parse-string response-body)]
      {:meta {:station_id   id
              :station_name (format-place data)}
       :departures (map wml-departure (data "departures"))})))

(defn- to-coordinate [string]
  (if (nil? string) nil
    (double (/ (read-string string) 1000000))))

(defn- wml-station [wml-station]
  (let [id nil]
    {:id    (wml-station "extId")
     :name  (wml-station "value")
     :location {:lat (to-coordinate (wml-station "ycoord")) :lng (to-coordinate (wml-station "xcoord"))}}))

(defn- transform-query-stations-response [response-body]
  (let [unparsed (reduce #(clojure.string/replace-first %1 %2 "") response-body [";SLs.showSuggestion();" "SLs.sls="])
        data     (json/parse-string unparsed)
        stations (data "suggestions")]
    {:stations (map wml-station (remove #(or (nil? (% "extId")) (not= "1" (% "type"))) stations))}))

; TODO error handling
(defn- do-api-call [url transform-fn]
  (let [response    (http/get url)]
    (transform-fn (:body @response))))

(defn- replaceholder [input placeholder replace]
   (clojure.string/replace input (str "{{" placeholder "}}") replace))


(defn station [id station-base-url]
  (let [stripped_id (clojure.string/replace id #"^0*" "")
        newid (subs stripped_id 2 (count stripped_id))
        request-url (replaceholder station-base-url "id" (add-luhny-digit newid))]
    (do-api-call request-url (transform-station-response id))))

(defn query-stations [query query-stations-base-url]
  (let [request-url (str query-stations-base-url (codec/url-encode query))]
    (do-api-call request-url transform-query-stations-response)))
