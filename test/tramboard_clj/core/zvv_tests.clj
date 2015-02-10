(ns tramboard-clj.core.zvv-tests
  (:use midje.sweet)
  (:require [tramboard-clj.core.zvv :as zvv]))

(def fixtures
  {:central_2228   (slurp "fixtures/zvv_responses/central_2228.txt")
   :kunsthaus_2336 (slurp "fixtures/zvv_responses/kunsthaus_2336.txt")
   :flughafen_xxxx (slurp "fixtures/zvv_responses/flughafen_xxxx.txt")
   :hirsch_xxxx    (slurp "fixtures/zvv_responses/hirsch_xxxx.txt")})

(facts "transform zvv response for station call"
       (fact "extracts station information under meta key"
             (zvv/transform-station-response (:central_2228 fixtures)) =>
             (contains {:meta (contains {:station_id "8588078" :station_name "Zürich, Central"})}))
       (fact "also works when there are no color information"
             (zvv/transform-station-response (:flughafen_xxxx fixtures)) =>
             (contains {:departures (contains {:zvv_id "11484850"
                                               :name "S2"
                                               :type "train"
                                               :accessible false
                                               :colors { :fg nil :bg nil }
                                               :to "Ziegelbrücke"
                                               :departure {
                                                           :scheduled "2015-02-01T19:36:00.000+01:00"
                                                           :realtime "2015-02-01T19:36:00.000+01:00"}})}))
       (fact "returns a list of departures"
             (zvv/transform-station-response (:central_2228 fixtures)) =>
             (contains {:departures (contains {:zvv_id "32108510"
                                               :name "31"
                                               :type "bus"
                                               :accessible true
                                               :colors { :fg "#ffffff" :bg "#a5a2c6" }
                                               :to "Zürich, Hegibachplatz"
                                               :departure {
                                                           :scheduled "2015-01-27T22:38:00.000+01:00"
                                                           :realtime "2015-01-27T22:38:00.000+01:00"}})})))

(facts "transform zvv response for query stations"
       (fact "extracts query stations"
             (zvv/transform-query-stations-response (:hirsch_xxxx fixtures)) =>
             (contains {:stations (just [{:id "008574001" :name "Ganterschwil, Hirschen"}
                                         {:id "008591193" :name "Zürich, Hirschwiesenstrasse"}
                                         {:id "008506380" :name "Hirschberg"}
                                         {:id "008500094" :name "Hirschlang"}
                                         {:id "008502197" :name "Hirschthal"}
                                         {:id "008577477" :name "Schwyz, Hirschen"}
                                         {:id "008571690" :name "Hirschmatt (Guggisberg), Allme"}
                                         {:id "008571689" :name "Hirschmatt (Guggisberg), Fall"}
                                         {:id "008571688" :name "Hirschmatt (Guggisberg),Schule"}
                                         {:id "008574080" :name "Heiden, Hirschli"}
                                         {:id "008582046" :name "Honau, Hirschen"}
                                         {:id "008592495" :name "Herblingen, Hirschen"}])})))
