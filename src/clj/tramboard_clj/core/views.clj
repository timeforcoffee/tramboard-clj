(ns tramboard-clj.core.views
  (:use [hiccup core page element]
        [tramboard-clj.core.include])
  (:require [tramboard-clj.core.zvv :as zvv])
  (:import com.newrelic.api.agent.Trace))

(defn- index-page* []
  (let [description "Real-time departures of public transport in Switzerland, for bus, train, tram, cable car..."
        lang        "en"
        title       "Time for Coffee!"]
    (html5 {:lang lang}
           [:head
            [:meta {:charset "UTF-8"}]
            [:meta {:http-equiv "Content-Type"    :content "text/html;charset=utf-8"}]
            [:meta {:http-equiv "X-UA-Compatible" :content "IE=edge"}]
            [:meta {:name "viewport" :content "width=device-width, initial-scale=1"}]
            [:meta {:name "language" :content lang}]
            [:meta {:name "og:locale" :content lang}]

            [:meta {:name "description" :content description}]
            [:meta {:name "og:description" :content description}]

            [:title "Time for Coffee!"]
            [:meta {:name "og:title" :content title}]
            [:meta {:name "og:url" :content "http://www.timeforcoffee.ch/"}]

            (include-css "//netdna.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css")
            (include-css "//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css")
            (include-css "/css/styles.css")
            (javascript-tag (str "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                                 (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                                 m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                                 })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
                                 ga('create', '" (or (System/getenv "GA_TRACKING") "dummy") "', 'auto');ga('send', 'pageview');"))
            (com.newrelic.api.agent.NewRelic/getBrowserTimingHeader)]
           (into
             [:body
              [:div {:id "my-app"}]
              (com.newrelic.api.agent.NewRelic/getBrowserTimingFooter)]
             (include-javascript)))))

(defn- station* [id]
  {:headers {"Content-Type" "application/json; charset=utf-8"}
   :body (zvv/station id)})

(defn- query-stations* [query]
  {:headers {"Content-Type" "application/json; charset=utf-8"}
   :body (zvv/query-stations query)})

(definterface INR
  (indexPage     [])
  (station       [id])
  (queryStations [query]))

(deftype NR []
  INR
  ;; @Trace maps to Trace {} metadata:
  (^{Trace {}} indexPage     [_]       (index-page*))
  (^{Trace {}} station       [_ id]    (station* id))
  (^{Trace {}} queryStations [_ query] (query-stations* query)))

(def ^:private nr (NR.))

(defn index-page     []      (.indexPage nr))
(defn station        [id]    (.station nr id))
(defn query-stations [query] (.queryStations nr query))
