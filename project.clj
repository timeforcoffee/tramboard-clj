(defproject tramboard-clj "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :min-lein-version "2.0.0"
  
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [compojure "1.3.1"]
                 [ring/ring-defaults "0.1.2"]
                 [org.clojure/clojurescript "0.0-2371"]
                 [om "0.8.0-rc1"]
                 [hiccup "1.0.0"]
                 [cljs-ajax "0.3.4"]
                 [org.clojure/core.async "0.1.346.0-17112a-alpha"]
                 [com.andrewmcveigh/cljs-time "0.3.0"]]
  
  :plugins [[lein-ring "0.8.13"]
            [lein-cljsbuild "1.0.3"]]
  
  :ring {:handler tramboard-clj.core.handler/app}
  
  :cljsbuild {
              :builds [{:id "dev"
                        :source-paths ["src"]
                        :compiler {:output-to "resources/public/js/main.js"
                                   :output-dir "resources/public/out"
                                   :optimizations :none
                                   :pretty-print true
                                   :source-map true}}]}
  
  :profiles {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                                  [ring-mock "0.1.5"]
                                  [figwheel "0.2.0-SNAPSHOT"]]
                   :plugins [[lein-figwheel "0.2.0-SNAPSHOT"]]
                   :figwheel {:css-dirs ["resources/public/css"]}}})
