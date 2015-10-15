(ns tramboard-clj.api.bvb
  (:require [ring.util.codec :as codec]            
            [tramboard-clj.api.vblbvb :as vblbvb]
            [digest] 
          ))
          
(def query-stations-base-url        "http://efa-bw.de/ios_bvb/XML_STOPFINDER_REQUEST?coordOutputFormat=NBWT&type_sf=any&locationServerActive=1&stateless=1&useHouseNumberList=true&doNotSearchForStops=1&reducedAnyWithoutAddressObjFilter_sf=103&reducedAnyPostcodeObjFilter_sf=64&reducedAnyTooManyObjFilter_sf=2&anyObjFilter_sf=126&anyMaxSizeHitList=600&w_regPrefAl=2&prMinQu=1&name_sf=")
(def station-base-url               "http://efa-bw.de/ios_bvb/XML_DM_REQUEST?type_dm=any&trITMOTvalue100=10&changeSpeed=normal&mergeDep=1&coordOutputFormat=NBWT&coordListOutputFormat=STRING&useAllStops=1&excludedMeans=checkbox&useRealtime=1&itOptionsActive=1&canChangeMOT=0&mode=direct&ptOptionsActive=1&imparedOptionsActive=1&depType=stopEvents&locationServerActive=1&useProxFootSearch=0&maxTimeLoop=2&includeCompleteStopSeq=0&name_dm=")

(defn- get-hash [dept] 
    (str "t" (digest/md5 (str (subs (clojure.string/replace (map-station-name (dept :to)) "^Basel " "" ) 1 3) (dept :name)((dept :departure) :scheduled)))))


; TODO error handling
(defn station [id sbbid]
  (let [request-url (str station-base-url id)]
        (vblbvb/station id sbbid request-url get-hash)))

(defn query-stations [query]
  (let [request-url (str query-stations-base-url (codec/url-encode query))]
    (vblbvb/query-stations query request-url)))
