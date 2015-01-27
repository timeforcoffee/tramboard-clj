(ns tramboard-clj.core.zvv-tests
  (:use midje.sweet)
  (:require [tramboard-clj.core.zvv :as zvv]))

(fact "dummy test"
	(+ 1 1) => 2
	(* 2 2) => 4)
