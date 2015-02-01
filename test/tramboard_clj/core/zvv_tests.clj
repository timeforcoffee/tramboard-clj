(ns tramboard-clj.core.zvv-tests
  (:use midje.sweet)
  (:require [tramboard-clj.core.zvv :as zvv]))

(def fixtures
  {:central_2228   (slurp "fixtures/zvv_responses/central_2228.txt")
   :kunsthaus_2336 (slurp "fixtures/zvv_responses/kunsthaus_2336.txt")
   :flughafen_xxxx (slurp "fixtures/zvv_responses/flughafen_xxxx.txt")})

(facts "transform zvv response"
       (fact "extracts station information under meta key"
             (zvv/transform-response (:central_2228 fixtures)) =>
             (contains {:meta (contains {:station_id "8588078" :station_name "Zürich, Central"})}))
       (fact "also works when there are no color information"
             (zvv/transform-response (:flughafen_xxxx fixtures)) =>
             (contains {:departures (contains {:zvv_id "11484850"
                                               :name "S2"
                                               :type "S"
                                               :colors { :fg nil :bg nil }
                                               :to "Ziegelbrücke"
                                               :departure {
                                                           :scheduled "2015-02-01T19:36:00.000+01:00"
                                                           :realtime "2015-02-01T19:36:00.000+01:00"}})}))
       (fact "returns a list of departures"
             (zvv/transform-response (:central_2228 fixtures)) =>
             (contains {:departures (contains {:zvv_id "32108510"
                                               :name "31"
                                               :type "Bus-NF"
                                               :colors { :fg "#ffffff" :bg "#a5a2c6" }
                                               :to "Zürich, Hegibachplatz"
                                               :departure {
                                                           :scheduled "2015-01-27T22:38:00.000+01:00"
                                                           :realtime "2015-01-27T22:38:00.000+01:00"}})})))
