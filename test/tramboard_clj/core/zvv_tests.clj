(ns tramboard-clj.core.zvv-tests
  (:require [tramboard-clj.api.zvv :as zvv]
            [midje.sweet :refer [facts fact contains just]]))

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
                                               :type "s-train"
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
             (contains {:stations (just [{:id "008574001", :location {:lat 47.379255, :lng 9.086395}, :name "Ganterschwil, Hirschen"} 
                                         {:id "008591193", :location {:lat 47.399994, :lng 8.543213}, :name "Zürich, Hirschwiesenstrasse"} 
                                         {:id "008506380", :location {:lat 47.331316, :lng 9.422834}, :name "Hirschberg"} 
                                         {:id "008500094", :location {:lat 47.410124, :lng 7.755191}, :name "Hirschlang"} 
                                         {:id "008502197", :location {:lat 47.319882, :lng 8.052815}, :name "Hirschthal"} 
                                         {:id "008577477", :location {:lat 47.046843, :lng 8.629698}, :name "Schwyz, Hirschen"} 
                                         {:id "008571690", :location {:lat 46.748887, :lng 7.312347}, :name "Hirschmatt (Guggisberg), Allme"} 
                                         {:id "008571689", :location {:lat 46.752447, :lng 7.311214}, :name "Hirschmatt (Guggisberg), Fall"} 
                                         {:id "008571688", :location {:lat 46.75588,  :lng 7.322361}, :name "Hirschmatt (Guggisberg),Schule"} 
                                         {:id "008574080", :location {:lat 47.433973, :lng 9.519621}, :name "Heiden, Hirschli"} 
                                         {:id "008582046", :location {:lat 47.133113, :lng 8.406496}, :name "Honau, Hirschen"} 
                                         {:id "008592495", :location {:lat 47.723749, :lng 8.66321},  :name "Herblingen, Hirschen"}])})))
