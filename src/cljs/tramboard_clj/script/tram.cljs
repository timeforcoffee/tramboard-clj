(ns tramboard-clj.script.tram
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [cljs.core.async :refer [put! chan <! >! close! timeout]]
            [clojure.string :as str]
            [clojure.set :as set]
            [cljs-time.core :refer [now]]
            [cljs-time.coerce :refer [to-long from-long]]
            [cljs-uuid.core :as uuid]
            [cljs.reader :as reader]
            [secretary.core :as secretary :refer-macros [defroute]]
            [goog.events :as events]
            [goog.history.EventType :as EventType]
            [goog.crypt.base64 :as b64]
            [tramboard-clj.components.icon :refer [number-icon transport-icon]]
            [tramboard-clj.components.filter :refer [c-filter-editor]]
            [tramboard-clj.components.edit :refer [edit-pane]]
            [tramboard-clj.components.util :refer [menu-bar menu-icon slogan credits]]
            [tramboard-clj.components.board :refer [arrival-tables-view]]
            [tramboard-clj.components.location :refer [choose-location-pane location-picker]]
            [tramboard-clj.script.time :refer [display-time parse-from-date-time format-to-hour-minute minutes-from]]
            [tramboard-clj.script.util :refer [locations get-location edit-or-add-destination get-destination init-destinations wait-on-channel ga get-stops-in-order]]
            [tramboard-clj.script.state :refer [is-home get-state go-home go-edit]])
  (:import goog.History))

; some global constants here
(def refresh-rate 10000)
(def current-version 1)

; our initial app state
(defonce app-state
  (atom {:version current-version
         ; views from local storage
         :configured-views (array-map)
         ; navigation state
         :current-state {:state :home :params {}}}))


(defn- uuid [] (str (uuid/make-random)))

(defn- deep-merge
  "Recursively merges maps. If vals are not maps, the last value wins."
  [& vals]
  (if (every? map? vals)
    (apply merge-with deep-merge vals)
    (last vals)))

(defn- remove-sharing-infos [view]
  (dissoc view :shared-view-hash))

(defn- update-updated-date [view]
  (assoc view :last-updated (to-long (now))))

(defn current-view [current-state configured-views]
  (let [view-id (:view-id (:params current-state))]
    (get configured-views view-id)))

(defn- simplify-view [view]
  "Removes known-destinations and last-updated from the view"
  (dissoc (update-in view [:stops]
                     ; we remove :view-id :last-updated from the view and :known-destinations from each stop
                     (fn [stops] (into {}  (map (fn [stop] (vector
                                                             (key stop)
                                                             (assoc (val stop) :known-destinations (filter #(:excluded %) (:known-destinations (val stop)))))) stops))))
          :view-id :last-updated))

(defn- export-string-from-view [view]
  "This removes all non necessary view information such as known destination and view id,
  But keeps the view id as shared-view-id so that we can identify when someone opens the
  same view twice for example."
  (let [string-view    (pr-str (simplify-view view))]
    (str/replace (b64/encodeString string-view) "=" "")))

(defn- pad [string num character]
  "Pads a string with character until it has a num divisable size"
  (let [length        (count string)
        too-big-by    (mod length num)
        base64-string (apply str string (repeat (if (= 0 too-big-by) 0 (- num too-big-by)) "="))]
    base64-string))

(defn- get-destinations-not-excluded [stop]
  (remove #(:excluded %) (:known-destinations stop)))

(defn- view-from-export-string [string]
  (reader/read-string (b64/decodeString (pad string 4 "="))))

(defn check-if-new-visitor [app-state]
  (let [new-visitor (if (empty? app-state) true false)]
    (assoc app-state :new-visitor  new-visitor)))

(defn get-recent-board-views [configured-views]
  (let [views        (map #(val %) configured-views)
        recent-views (take 10 (sort-by #(- (:last-updated %)) views))]
    recent-views))

(defn- remove-stop-and-update-date [current-view stop-id]
  (let [new-stops        (dissoc (:stops current-view) stop-id)
        new-stops-order  (vec (remove #(= stop-id %) (:stops-order current-view)))
        new-current-view (remove-sharing-infos
                           (update-updated-date (assoc current-view
                                                  :stops new-stops
                                                  :stops-order new-stops-order)))]
    new-current-view))

(defn- add-stop-and-update-date [current-view {:keys [:id] :as stop}]
  (let [existing-stops       (:stops current-view)
        existing-stops-order (or (:stops-order current-view) [])
        existing-stop        (get existing-stops id)
        new-stops            (assoc existing-stops id (merge (or existing-stop {}) stop))
        new-stops-order      (if-not existing-stop (conj existing-stops-order id) existing-stops-order)
        new-current-view     (remove-sharing-infos
                               (update-updated-date (assoc current-view
                                                      :stops new-stops
                                                      :stops-order new-stops-order)))]
    new-current-view))

(defn- delete-view-if-no-stops [configured-views view-id]
  (let [current-view  (get configured-views view-id)
        current-stops (:stops current-view)]
    (if (empty? current-stops)
      ; we dissoc the current view and set the state to home
      (dissoc configured-views view-id)
      configured-views)))

(defn- create-view-from-view [view]
  (let [view-id        (uuid)]
    (update-updated-date (into {:view-id view-id} view))))

(defn- create-new-view [location-id]
  (assoc (create-view-from-view nil) :location-id location-id))

(defn- get-shared-view [shared-view-hash configured-views]
  (let [shared-view (first (filter #(= (:shared-view-hash %) shared-view-hash) (map val configured-views)))]
    (println shared-view)
    shared-view))

(defn swap-import-and-display-view [app imported-view shared-view-hash]
  (swap!
    app (fn [app]
          (let [configured-views     (:configured-views app)
                current-state        (:current-state app)

                shared-view          (get-shared-view shared-view-hash configured-views)
                view                 (or shared-view (assoc (create-view-from-view imported-view) :shared-view-hash shared-view-hash))
                view-id              (:view-id view)
                ; TODO this is the same as in transact-add-stop, simplify
                new-configured-views (assoc configured-views view-id view)
                ; TODO this is the same as in transact-add-stop, simplify
                new-current-state    (go-edit current-state view-id)
                new-app              (assoc app
                                       :configured-views new-configured-views
                                       :current-state new-current-state)]
            new-app))))

(secretary/set-config! :prefix "#")
(defroute share-link "/link/*" {hash :*}
  (let [imported-view  (view-from-export-string hash)]
    (println "Got link with a view to display" imported-view)
    (swap-import-and-display-view app-state imported-view hash)
    (.setToken (History.) "")))

(defn- get-share-link [view]
  (str (.. js/window -location -protocol) "//" (.. js/window -location -host) "/" (share-link {:* (export-string-from-view view)})))

; Those 4 methods modify the view and will remove the shared-view-id param
; TODO move to own namespace
(defn transact-add-stop [app stop]
  (om/transact!
    app (fn [app]
          (let [configured-views     (:configured-views app)
                current-state        (:current-state app)
                is-new-view          (is-home current-state)
                edit-view-id         (:view-id (:params current-state))
                current-view         (if is-new-view (create-new-view (:location-id app)) (get configured-views edit-view-id))
                view-id              (:view-id current-view)
                new-current-state    (go-edit current-state view-id)
                new-view             (add-stop-and-update-date current-view stop)
                new-configured-views (assoc configured-views view-id new-view)]
            (ga "send" "event" "stop" "add" {:dimension1 (:id stop)})
            (assoc app :configured-views new-configured-views :current-state new-current-state)))))

(defn transact-remove-stop [app stop-id]
  (om/transact!
    app (fn [app]
          (let [configured-views     (:configured-views app)
                current-state        (:current-state app)
                current-view         (current-view current-state configured-views)
                view-id              (:view-id current-view)
                stop-id              (if-not stop-id (last (:stops-order current-view)) stop-id)
                new-view             (remove-stop-and-update-date current-view stop-id)
                new-configured-views (delete-view-if-no-stops (assoc configured-views view-id new-view) view-id)
                go-home?             (not (get new-configured-views view-id))
                new-current-state    (if go-home? (go-home current-state) current-state)]
            (ga "send" "event" "stop" "remove" {:dimension1 stop-id})
            (assoc app :configured-views new-configured-views :current-state new-current-state)))))

(defn transact-toggle-filter [view arrival]
  (let [stop-id     (:stop-id arrival)
        number      (:number arrival)
        destination (:to arrival)]
    (om/transact!
      view (fn [view]
             ; we add the filter
             (let [stop                           (get (:stops view) stop-id)
                   existing-known-destinations    (:known-destinations stop)
                   existing-destination           (get-destination existing-known-destinations arrival)
                   is-already-excluded            (:excluded existing-destination)
                   new-known-destinations         (edit-or-add-destination existing-known-destinations (assoc existing-destination :excluded (not is-already-excluded)))
                   new-current-view               (remove-sharing-infos
                                                    (update-updated-date
                                                      (assoc-in view [:stops stop-id :known-destinations] new-known-destinations)))]
               (println new-known-destinations)
               new-current-view)))))

(defn transact-fullscreen [state]
  (om/transact! state :params #(assoc % :display :expanded)))

(defn transact-exit-fullscreen [state]
  (om/transact! state :params #(dissoc % :display)))

(defn- cap [string x letter]
  (if (= 0 (- x (count string))) string (cap (str letter string) x letter)))

(defn- transform-stationboard-data [json-data]
  (->> (:departures json-data)
       (map
         (fn [entry]
           (let [scheduled-departure (:scheduled (:departure entry))
                 is-realtime         (:realtime (:departure entry))
                 realtime-departure  (or (:realtime (:departure entry)) scheduled-departure)
                 departure-timestamp (parse-from-date-time realtime-departure)
                 now                 (now)]
             {:departure-timestamp departure-timestamp
              :colors              (:colors entry)
              :type                (:type entry)
              :accessible          (:accessible entry)
              :number              (:name entry)
              :sort-string         (cap (:name entry) 20 "0")
              :to                  (:to entry)
              :in-minutes          (minutes-from departure-timestamp now)
              :time                (format-to-hour-minute departure-timestamp)
              :is-realtime         is-realtime
              :undelayed-time      (when (not= realtime-departure scheduled-departure)
                                     (let [scheduled-departure-timestamp (parse-from-date-time scheduled-departure)]
                                       (format-to-hour-minute scheduled-departure-timestamp)))})))))

(defn control-bar [{:keys [current-state current-view edit-filter-mode]} owner]
  (reify
    om/IInitState
    (init-state [_]
                {:edit-filter-mode false})
    om/IDidUpdate
    (did-update [_ _ prev-state]
                ; we set the focus here on share input if necessary
                (let [share-input-visible (om/get-state owner :share-input-visible)
                      share-input (om/get-node owner "shareInput")]
                  (if share-input-visible
                    (do
                      ; we recalculate the share string
                      (let [prev-share-input-value (:share-input-value prev-state)
                            new-share-input-value  (get-share-link current-view)]
                        (when (not= prev-share-input-value new-share-input-value)
                          (om/set-state! owner :share-input-value new-share-input-value)))
                      (when (not (:share-input-visible prev-state))
                        (.focus share-input)))
                    (when (:share-input-visible prev-state)
                      (.blur share-input)))))
    om/IRenderState
    (render-state [this {:keys [share-input-value share-input-visible edit-filter-mode toggle-filter-ch]}]
                  (let [expanded              (= :expanded (:display (:params current-state)))
                        filter-text           "filter destinations"
                        fullscreen-text       "fullscreen"
                        share-text            "share this board"
                        on-filter-action      (fn [e]
                                                (let [edit-filter-mode (om/get-state owner :edit-filter-mode)]
                                                  (if-not edit-filter-mode
                                                    (ga "send" "event" "filter" "enter")
                                                    (ga "send" "event" "filter" "exit"))
                                                  (om/update-state! owner #(assoc %
                                                                             :edit-filter-mode (not edit-filter-mode)
                                                                             ; we exit the share buttom
                                                                             :share-input-visible false)))
                                                (.preventDefault e))
                        on-share-action       (fn [e]
                                                (.preventDefault e)
                                                (om/update-state! owner
                                                                  (fn [state]
                                                                    (let [share-input-value   (or (:share-input-value state)
                                                                                                  (get-share-link current-view))
                                                                          share-input-visible (not (:share-input-visible state))]
                                                                      (if share-input-visible
                                                                        (ga "send" "event" "share" "enter")
                                                                        (ga "send" "event" "share" "exit"))
                                                                      (assoc state
                                                                        :share-input-value share-input-value
                                                                        :share-input-visible share-input-visible
                                                                        ; we exit edit mode
                                                                        :edit-filter-mode false)))))
                        on-fullscreen-action  (fn [e]
                                                ; we change the state to hidden
                                                (if-not expanded
                                                  (ga "send" "event" "fullscreen" "enter")
                                                  (ga "send" "event" "fullscreen" "exit"))
                                                (if expanded
                                                  (transact-exit-fullscreen current-state)
                                                  (transact-fullscreen current-state))
                                                (.preventDefault e))]
                    (dom/div #js {:className (str "control-bar " (when (or edit-filter-mode share-input-visible) "keep-bar"))}
                             (dom/div #js {:className "filter-wrapper"}
                                      (dom/div #js {:className (str "filter-container " (when edit-filter-mode "visible"))}
                                               (om/build c-filter-editor current-view
                                                         {:init-state {:toggle-filter-ch toggle-filter-ch}
                                                          :opts {:on-action on-filter-action}})))
                             (dom/div #js {:className "share-container"}
                                      (let [on-action (fn [e]
                                                        (let [share-input (om/get-node owner "shareInput")]
                                                          (.setSelectionRange share-input 0 (count (.-value share-input))))
                                                        (.preventDefault e))]
                                        (dom/div #js {:className "share-input-container"}
                                                 (dom/input #js {:aria-label "share URL"
                                                                 :className (str "share-input form-control " (when-not share-input-visible "hidden"))
                                                                 :ref "shareInput"
                                                                 :type "text"
                                                                 :value share-input-value
                                                                 :onClick on-action
                                                                 :onFocus on-action
                                                                 :onTouchEnd on-action}))))

                             (dom/div #js {:className "control-bar-buttons"}

                                      (dom/button #js {:href "#"
                                                       :type "button"
                                                       :className (str "btn btn-sm btn-default " (when edit-filter-mode "active"))
                                                       :aria-label filter-text
                                                       :onClick on-filter-action
                                                       :onTouchStart on-filter-action}
                                                  (dom/span #js {:className "glyphicon glyphicon-filter"}) filter-text)
                                      (dom/button #js {:href "#"
                                                       :type "button"
                                                       :aria-label share-text
                                                       :className (str "share-link btn btn-sm btn-default " (when share-input-visible "active"))
                                                       :onClick on-share-action
                                                       :onTouchStart on-share-action}
                                                  (dom/span #js {:className "glyphicon glyphicon-link"}) share-text)
                                      (dom/button #js {:href "#"
                                                       :type "button"
                                                       :className (str "btn btn-sm btn-default " (when expanded "active"))
                                                       :aria-label fullscreen-text
                                                       :onClick on-fullscreen-action
                                                       :onTouchStart on-fullscreen-action}
                                                  (dom/span #js {:className "glyphicon glyphicon-resize-full"}) fullscreen-text)))))))

(defn recent-board-item-stop [stop owner]
  (reify
    om/IRender
    (render [this]
            (dom/li nil (:number stop)))))

(defn recent-board-item-number [number-with-colors owner]
  (reify
    om/IRender
    (render [this]
            (dom/li nil
                    (om/build number-icon number-with-colors)))))

(defn recent-board-item [{:keys [view current-state]} owner]
  (reify
    om/IRenderState
    (render-state [this {:keys [value-ch]}]
                  (dom/div #js {:className "recent-board"}
                           (let [on-click (fn [e]
                                            (ga "send" "event" "navigation" "recent-board")
                                            (om/transact! current-state #(go-edit % (:view-id view)))
                                            (put! value-ch "")
                                            (.preventDefault e))]
                             (dom/a #js {:href "#"
                                         :onClick on-click}
                                    ; a list of all stops
                                    (dom/h2 #js {:className "thin"}
                                            (str (str/join " / " (map #(:name %) (get-stops-in-order view)))))
                                    ; a thumbnail of all trams
                                    (dom/div #js {:className "number-list"}
                                             (let [numbers         (->> (:stops view)
                                                                        (map #(get-destinations-not-excluded (val %)))
                                                                        (reduce into #{})
                                                                        (map #(select-keys % [:number :colors :type :sort-string]))
                                                                        (distinct)
                                                                        (sort-by :sort-string))
                                                   too-big         (> (count numbers) 9)
                                                   numbers-to-show (if too-big (conj (vec (take 8 numbers)) {:number "..."}) numbers)]
                                               (apply dom/ul #js {:className "list-inline"} (om/build-all recent-board-item-number numbers-to-show))))))))))

; TODO move to own namespace, remove current-state
(defn recent-boards [{:keys [recent-views current-state]} owner]
  (reify
    om/IRenderState
    (render-state [this {:keys [value-ch]}]
                  (apply dom/div nil
                         (conj (dom/h1 #js {:className "heading thin"} "Your recent boards"))
                         (into [] (map #(om/build recent-board-item {:view % :current-state current-state} {:init-state {:value-ch value-ch}}) recent-views))))))

(defn strong [text]
  (dom/span #js {:className "thin"} text))

(defn welcome-banner [_ owner]
  (reify
    om/IRender
    (render [this]
            (dom/h1 #js {:className "ultra-thin welcome-banner text-center"}
                    (dom/div nil
                             "Relax and don't wait at the stop for your next "
                             (dom/span #js {:className "no-wrap"} (strong "bus")   " " (om/build transport-icon {:type "bus"})) ", "
                             (dom/span #js {:className "no-wrap"} (strong "tram")  " " (om/build transport-icon {:type "tram"}))  ", "
                             (dom/span #js {:className "no-wrap"} (strong "train") " " (om/build transport-icon {:type "train"})) ", "
                             (dom/span #js {:className "no-wrap"} (strong "boat")  " " (om/build transport-icon {:type "boat"}))  " or "
                             (dom/span #js {:className "no-wrap"} (strong "cable car") " " (om/build transport-icon {:type "cable-car"}) "."))))))

(defn enter-stop-heading [{:keys [location]} owner]
  (reify
    om/IRenderState
    (render-state [this {:keys [location-ch]}]
                  (dom/h1 #js {:className "ultra-thin welcome-banner text-center"}
                          (dom/div nil "Enter any stop in "

                                   (dom/div #js {:className "edit-form-location-container"}
                                            (om/build location-picker
                                                      {:location location :locations locations}
                                                      {:init-state {:location-ch location-ch}
                                                       :state {:open false}}))
                                   " to get started.")))))

(defn stationboard-pane [{:keys [current-view current-state]} owner]
  (reify
    om/IInitState
    (init-state [_]
                {:activity-ch (chan) :toggle-filter-ch (chan)})
    om/IWillMount
    (will-mount [_]
                (let [{:keys [activity-ch
                              toggle-filter-ch]} (om/get-state owner)]
                  (wait-on-channel
                    activity-ch
                    (fn [_] (om/update-state!
                              owner
                              (fn [s]
                                (let [old-hide-ch (:hide-ch s)
                                      new-hide-ch (chan)]
                                  (when old-hide-ch (close! old-hide-ch))

                                  (go (when-some [hide (<! new-hide-ch)]
                                                 (when hide (om/set-state! owner :activity :idle))))

                                  (go (<! (timeout 1500))
                                      (put! new-hide-ch true))

                                  (assoc s
                                    :activity :not-idle
                                    :hide-ch new-hide-ch))))))
                  (wait-on-channel
                    toggle-filter-ch
                    (fn [{:keys [destination]}]
                      (transact-toggle-filter current-view destination)))))
    om/IWillUnmount
    (will-unmount [this]
                  (let [{:keys [hide-ch activity-ch
                                toggle-filter-ch]} (om/get-state owner)]
                    (close! activity-ch)
                    (close! toggle-filter-ch)
                    (when hide-ch (close! hide-ch))))
    om/IRenderState
    (render-state [this {:keys [activity activity-ch toggle-filter-ch add-stop-ch remove-stop-ch]}]
                  (let [on-action (fn [preventDefault e]
                                    (put! activity-ch true)
                                    (when preventDefault (.preventDefault e)))]
                    (dom/div #js {:className (str "container-fluid " (when (= activity :idle) "activity-idle"))
                                  :onMouseMove #(on-action true %)
                                  :onClick #(on-action true %)
                                  :onTouchEnd #(on-action false %)}
                             (om/build control-bar
                                       {:current-state current-state :current-view current-view}
                                       {:init-state {:toggle-filter-ch toggle-filter-ch}})
                             (om/build arrival-tables-view
                                       {:current-view current-view}
                                       {:init-state {:activity-ch activity-ch :toggle-filter-ch toggle-filter-ch}
                                        :opts {:refresh-rate refresh-rate
                                               :transform-stationboard-data transform-stationboard-data}}))))))

(defn build-title-edit [last-updated]
  (dom/span nil
            (dom/div #js {:className "bold"} "Your current board")
            (dom/div #js {:className "thin"} (str "saved "
                                                  (display-time last-updated)))))

(defn build-title-home []
  (dom/span #js {:className "text-middle bold"} "You've got Time for Coffee!"))

(defn stationboard [{:keys [current-state configured-views] :as app} owner]
  "Takes the app (contains all views, selected view) and renders the whole page"
  (reify
    om/IInitState
    (init-state [_]
                {:add-stop-ch (chan) :remove-stop-ch (chan) :has-input-ch (chan) :value-ch (chan) :hide-welcome false})
    om/IWillMount
    (will-mount [_]
                (let [{:keys [add-stop-ch remove-stop-ch has-input-ch]} (om/get-state owner)]
                  ; TODO allow the children here to modify their views directly
                  ; and listen on those view changes, see board.cljs and above for comment
                  (wait-on-channel
                    add-stop-ch
                    (fn [{:keys [stop]}]
                      (transact-add-stop app stop)))
                  (wait-on-channel
                    remove-stop-ch
                    (fn [{:keys [stop-id]}]
                      (transact-remove-stop app stop-id)))
                  (wait-on-channel
                    has-input-ch
                    (fn [has-input]
                      (when has-input (om/set-state! owner :hide-welcome true))))))
    om/IWillUnmount
    (will-unmount [this]
                  (let [{:keys [hide-ch value-ch add-stop-ch remove-stop-ch has-input-ch]} (om/get-state owner)]
                    (close! add-stop-ch)
                    (close! value-ch)
                    (close! remove-stop-ch)
                    (close! has-input-ch)
                    (when hide-ch (close! hide-ch))))
    om/IDidUpdate
    (did-update [this _ _]
                (let [is-home      (is-home current-state)
                      hide-welcome (om/get-state owner :hide-welcome)]
                  (when (and (not is-home) hide-welcome) (om/set-state! owner :hide-welcome false))))
    om/IRenderState
    (render-state [this {:keys [add-stop-ch remove-stop-ch has-input-ch value-ch location-ch hide-welcome]}]
                  ; those all depend on the screen that's displayed
                  (let [location         (get-location (:location-id app))
                        current-view     (current-view current-state configured-views)
                        recent-views     (get-recent-board-views configured-views)
                        display          (:display (:params current-state))
                        is-home          (is-home current-state)
                        home-icon        (om/build menu-icon nil
                                                   {:state {:icon-class "glyphicon-home"
                                                            :hidden-text "go back"}
                                                    :opts  {:on-click (fn [e]
                                                                        (ga "send" "event" "navigation" "home")
                                                                        (put! value-ch "")
                                                                        (om/transact! current-state #(go-home %))
                                                                        (.preventDefault e))}})
                        title            (if is-home (build-title-home ) (build-title-edit (:last-updated current-view)))]

                    (println "Rendering stationboard")
                    (dom/div (clj->js {:className (str "pane " (when (= display :expanded) "display-expanded"))})

                             (om/build menu-bar nil {:state {:left-icon (when-not is-home home-icon)
                                                             :title title}})
                             (dom/div #js {:className "container-fluid"}
                                      ; TODO review this
                                      (dom/div #js {:className (str "responsive-display " (when-not is-home "hidden"))}
                                               (dom/div #js {:className (when hide-welcome "hidden")}
                                                  (om/build welcome-banner nil))
                                               (om/build enter-stop-heading {:location location} {:init-state {:location-ch location-ch}}))
                                      (om/build edit-pane
                                                {:stops (get-stops-in-order current-view)
                                                 :display-credits is-home
                                                 :location location
                                                 :locations locations}
                                                {:init-state {:add-stop-ch add-stop-ch
                                                              :remove-stop-ch remove-stop-ch
                                                              :has-input-ch has-input-ch
                                                              :value-ch value-ch
                                                              :show-edit is-home}
                                                 :state {:always-show is-home}})
                                      (dom/div #js {:className (str "responsive-display " (when (or (not is-home) (empty? recent-views)) "hidden"))}
                                               (om/build recent-boards {:recent-views recent-views :current-state current-state} {:init-state {:value-ch value-ch}})))
                             (when-not is-home
                               (om/build stationboard-pane
                                         {:current-view current-view
                                          :location location
                                          :current-state current-state}
                                         {:init-state {:add-stop-ch add-stop-ch :remove-stop-ch remove-stop-ch}})))))))

(defn choose-location [{:keys [complete-state] :as app} owner]
  (reify
    om/IRenderState
    (render-state [this {:keys [location-ch]}]
                  (dom/div nil
                           (om/build menu-bar nil {:state {:right-icon nil
                                                           :left-icon nil
                                                           :title (build-title-home)}})
                           (om/build choose-location-pane
                                     {:locations locations}
                                     {:init-state {:location-ch location-ch}})))))

(defn application [app owner]
  (reify
    om/IInitState
    (init-state [_]
                {:location-ch (chan)})
    om/IWillMount
    (will-mount [_]
                (let [{:keys [location-ch]} (om/get-state owner)]
                  (wait-on-channel
                    location-ch
                    (fn [{:keys [id]}]
                      (om/transact! app #(check-if-new-visitor (assoc % :location-id id)))))))
    om/IWillUnmount
    (will-unmount [this]
                  (let [{:keys [location-ch]} (om/get-state owner)]
                    (close! location-ch)))
    om/IRenderState
    (render-state [this {:keys [location-ch]}]
                  (dom/div nil
                           (let [new-visitor (:new-visitor app)]
                             (if new-visitor
                               (om/build choose-location app {:init-state {:location-ch location-ch}})
                               (om/build stationboard app {:init-state {:location-ch location-ch}})))
                           (dom/footer #js {:className "text-center"} (om/build credits nil))))))

(defn hook-browser-navigation! []
  (doto (History.)
    (events/listen
      EventType/NAVIGATE
      (fn [event]
        (secretary/dispatch! (.-token event))))
    (.setEnabled true)))

(defn- debug-corrupt-view [view]
  (let [stops-with-to (into {} (filter #(contains? (val %) :name) (:stops view)))
        stop-ids      (map #(key %) stops-with-to)
        stops-order   (:stops-order view)
        stops-to-add  (set/difference (into #{} stop-ids) stops-order)
        new-view      (assoc view
                        :stops-order (into [] (concat stops-order stops-to-add))
                        :stops stops-with-to)]
    new-view))

(defn- debug-corrupt-views [app-state]
  "This removes the views that might have been corrupted with the bug that kept destinations
  displayed even though they were removed."
  (if-not (nil? (:configured-views app-state))
    (let [configured-views  (:configured-views app-state)
          new-clean-views   (into {} (map #(vector (key %) (debug-corrupt-view (val %))) configured-views))
          new-views         (into {} (remove #(empty? (:stops (val %))) new-clean-views))
          current-state     (:current-state app-state)
          new-current-state (if (> (count configured-views) (count new-views)) (go-home current-state) current-state)]
      (assoc app-state :configured-views new-views :current-state new-current-state))
    app-state))

(defn- debug-app-state [app-state]
  "This removes the complete-state if there is one and takes state number 1 as current state."
  (if-not (nil? (:complete-state app-state))
    (let [complete-state  (:complete-state app-state)
          state-1         (get-state complete-state :state-1)
          state-2         (get-state complete-state :state-2)]
      (dissoc (assoc app-state :current-state (dissoc state-1 :state-id :visible)) :complete-state))
    app-state))

(defn init! []
  (let [saved-state (or (try (reader/read-string (. js/localStorage (getItem "views"))) (catch :default e (println e) {})) {})]
    (swap! app-state deep-merge ((comp debug-corrupt-views debug-app-state check-if-new-visitor) saved-state))
    (println app-state)
    (hook-browser-navigation!)))

(defn main []
  (om/root application app-state
           {:target (. js/document (getElementById "my-app"))
            :tx-listen (fn [{:keys [path new-state]} _]
                         (. js/localStorage (setItem "views"
                                                     ; here if we don't dissoc the page will reload in the current state
                                                     (pr-str (assoc new-state :last-saved (to-long (now)))))))}))

