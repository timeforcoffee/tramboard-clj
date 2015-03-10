(ns tramboard-clj.core.views
  (:use [hiccup core page element]
        [tramboard-clj.core.include])
  (:require [tramboard-clj.core.zvv :as zvv])
  (:import com.newrelic.api.agent.Trace))

(defn- content-page [content]
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
              content
              (com.newrelic.api.agent.NewRelic/getBrowserTimingFooter)]
             (include-javascript)))))

(defn- index-page* []
  (content-page [:div {:id "my-app"}]))

(defn- about-page* [] 
  (content-page 
    [:div
     [:header {:class "menu-bar"}
      [:div {:class "container-fluid"} 
       [:div {}
        [:span {:class "back-link pull-left"}
         [:a {:class "link-icon glyphicon glyphicon-home" :href "/" :aria-label "go back"}]]
        [:span {:class "text-middle bold"} "You've got Time for Coffee!"]]]]
     [:div {:class "container-fluid"}
      [:h1 {:class "ultra-thin text-center"} "Contributors"]
      [:h3 {:class "ultra-thin text-center"} [:a {:href "http://twitter.com/fterrier"} "François Terrier"] " - original idea, API and web programming"]
      [:h3 {:class "ultra-thin text-center"} [:a {:href "http://twitter.com/jlgeering"} "Jean-Luc Geering"] " - original idea, API programming"]
      [:h3 {:class "ultra-thin text-center"} [:a {:href "http://twitter.com/serge_pfeifer"} "Serge Pfeifer"] " - original idea, testing"]
      [:h3 {:class "ultra-thin text-center"} [:a {:href "http://twitter.com/dulnan"} "Jan Hug"] " - API, iOS app UX, design and programming"]
      [:h3 {:class "ultra-thin text-center"} "Kristina Bagdonaite" " - web UX"]
      [:h3 {:class "ultra-thin text-center"} [:a {:href "http://twitter.com/chregu"} "Christian Stocker"] " - iOS app & Apple watch programming"]
      [:h3 {:class "ultra-thin text-center"} [:a {:href "http://twitter.com/gabac"} "Cyril Gabathuler"] " - iOS app & Apple watch programming"]
      
      [:h1 {:class "ultra-thin text-center"} "Special Thanks"]
      [:h3 {:class "ultra-thin text-center"} [:a {:href "http://transport.opendata.ch/"} "OpenData Transport API"] " / " [:a {:href "http://www.liip.ch/"} "Liip AG"]]
      
      [:h2 {:class "thin text-center"} [:a {:href "http://twitter.com/time4coffeeApp"} "Get in touch "] " & " [:a {:href "http://github.com/timeforcoffee/"} "contribute!"] ]]]))



(defn- station* [id]
  {:headers {"Content-Type" "application/json; charset=utf-8"}
   :body (zvv/station id)})

(defn- query-stations* [query]
  {:headers {"Content-Type" "application/json; charset=utf-8"}
   :body (zvv/query-stations query)})

(definterface INR
  (indexPage     [])
  (aboutPage     [])
  (station       [id])
  (queryStations [query]))

(deftype NR []
  INR
  ;; @Trace maps to Trace {} metadata:
  (^{Trace {}} indexPage     [_]       (index-page*))
  (^{Trace {}} aboutPage     [_]       (about-page*))
  (^{Trace {}} station       [_ id]    (station* id))
  (^{Trace {}} queryStations [_ query] (query-stations* query)))

(def ^:private nr (NR.))

(defn index-page     []      (.indexPage nr))
(defn about-page     []      (.aboutPage nr))
(defn station        [id]    (.station nr id))
(defn query-stations [query] (.queryStations nr query))
