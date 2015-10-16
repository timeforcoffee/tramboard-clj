(ns tramboard-clj.api.vbl
  (:require [ring.util.codec :as codec]            
            [tramboard-clj.api.vblbvb :as vblbvb]
            [digest] 
          ))

(def query-stations-base-url        "http://mobil.vbl.ch/vblUltra/XML_STOPFINDER_REQUEST?anyMaxSizeHitList=30&coordOutputFormat=MRCV&type_sf=any&locationServerActive=1&anyObjFilter_sf=42&name_sf=")
(def station-base-url               "http://mobil.vbl.ch/vblUltra/XML_DM_REQUEST?type_dm=any&trITMOTvalue100=10&changeSpeed=normal&mergeDep=1&coordOutputFormat=MRCV&coordListOutputFormat=STRING&useAllStops=1&excludedMeans=checkbox&useRealtime=1&itOptionsActive=1&canChangeMOT=0&mode=direct&ptOptionsActive=1&imparedOptionsActive=1&depType=stopEvents&locationServerActive=1&maxTimeLoop=2&includeCompleteStopSeq=0&useProxFootSearch=0&name_dm=")

(defn- get-hash [dept] 
    (str "t" (digest/md5 (str (subs (dept :to) 1 3) (dept :name)((dept :departure) :scheduled)))))


; TODO error handling
(defn station [id sbbid]
  (let [request-url (str station-base-url id)]
        (vblbvb/station id sbbid request-url get-hash)))

(defn query-stations [query]
  (let [request-url (str query-stations-base-url (codec/url-encode query))]
    (vblbvb/query-stations query request-url)))
    

