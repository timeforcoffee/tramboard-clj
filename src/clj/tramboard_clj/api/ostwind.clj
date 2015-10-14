(ns tramboard-clj.api.ostwind
  (:require [cheshire.core :as json]
            [ring.util.codec :as codec]
            [clj-time.core :as t]
            [clj-time.format :as f]
            [clojure.string :as str]
            [org.httpkit.client :as http]
            [clojure.tools.html-utils :as html]
            [tramboard-clj.api.wml :as wml]

                        ))

;the code is in blt.clj
            
(def query-stations-base-url "http://online.fahrplan.zvv.ch/bin/ajax-getstop.exe/dny?start=1&tpl=suggest2json&REQ0JourneyStopsS0A=7&getstop=1&noSession=yes&REQ0JourneyStopsB=25&REQ0JourneyStopsS0G=")
(def station-base-url        "http://data.wemlin.com/rest/v0/networks/ostwind/stations/DI-0000{{id}}/20151013T1534/20151013T1739")

; TODO error handling

(defn station [id]
  (wml/station id))

(defn query-stations [query]
  (wml/query-stations query))
