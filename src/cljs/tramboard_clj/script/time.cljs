(ns tramboard-clj.script.time
  "This namespace contains everything that deals with time and dates, to display the
  time in minutes for example."
  (:require [cljs-time.core :refer [minute hour in-minutes interval now after? minus weeks within? days to-default-time-zone]]
            [cljs-time.format :refer [parse unparse formatters formatter show-formatters]]
            [cljs-time.coerce :refer [to-long from-long]]))

(def ^{:private true} hour-minute-formatter (formatter "HH:mm"))
(def ^{:private true} date-formatter (formatter "d MMM yyyy"))
(def ^{:private true} only-day-formatter (formatter "EEEE"))

(defn- is-within [datetime from length]
  (within? (interval (minus from length) from) datetime))

(defn- parse-from-date-time-uncached [unparsed-date]
  (parse (formatters :date-time) unparsed-date))

(defn minutes-from [timestamp from]
  "Returns the difference in minutes between from and timestamp."
  (if (after? from timestamp)
    (- (in-minutes (interval timestamp from)))
    (in-minutes (interval from timestamp))))

(defn format-to-hour-minute [timestamp]
  "Formats a timestamp to HH:mm"
  (unparse hour-minute-formatter (to-default-time-zone timestamp)))

(defn display-time [timestamp]
  "Unpure function that decides how this should be displayed depending on the current day"
  (let [now                (now)
        datetime           (from-long timestamp)
        date-format        (unparse date-formatter (to-default-time-zone datetime))
        hour-minute-format (unparse hour-minute-formatter (to-default-time-zone datetime))
        is-today           (= date-format (unparse date-formatter (to-default-time-zone now)))
        is-within-a-week   (is-within datetime now (weeks 1))
        is-yesterday       (is-within datetime now (days 1))
        display-time       (str
                             (if is-today "today"
                               (if is-yesterday "yesterday"
                                 (if is-within-a-week (str "last " (unparse only-day-formatter (to-default-time-zone datetime)))
                                   (str " on " date-format))))
                             " at " hour-minute-format)]
    display-time))

(def parse-from-date-time
  "Parses a date in the format 21-12-2015T12:12:00.000+01:00 into a timestamp.
  This call is memoized."
  (memoize parse-from-date-time-uncached))
