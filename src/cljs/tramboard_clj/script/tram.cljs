(ns tramboard-clj.script.tram
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [cljs.core.async :refer [put! chan <! >! close! timeout]]
            [clojure.string :as str]
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
            [tramboard-clj.components.menu :refer [menu-bar menu-icon]]
            [tramboard-clj.components.board :refer [arrival-tables-view]]
            [tramboard-clj.script.time :refer [display-time parse-from-date-time format-to-hour-minute minutes-from]]
            [tramboard-clj.script.util :refer [is-in-destinations remove-from-destinations add-to-destinations wait-on-channel ga get-stops-in-order]]
            [tramboard-clj.script.state :refer [is-home is-split get-state go-home go-edit go-toggle-split modify-complete-state get-all-states reset-complete-state]])
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
         :complete-state {:split-states {:state-1 {:state-id :state-1 :state :home :params {} :visible true}
                                         :state-2 {:state-id :state-2 :state :home :params {} :visible false}}
                          :order [:state-1 :state-2]}}))

(defn- uuid [] (str (uuid/make-random)))

(defn- deep-merge
  "Recursively merges maps. If vals are not maps, the last value wins."
  [& vals]
  (if (every? map? vals)
    (apply merge-with deep-merge vals)
    (last vals)))

(defn- reset-sharing-infos [view]
  (assoc view :shared-view-id (uuid)))

(defn- update-updated-date [view]
  (assoc view :last-updated (to-long (now))))

(defn current-view [current-state configured-views]
  (let [view-id (:view-id (:params current-state))]
    (get configured-views view-id)))

(defn- simplify-view [view]
  "Removes known-destinations and last-updated from the view"
  (dissoc (update-in view [:stops]
                     ; we remove :view-id :last-updated from the view and :known-destinations from each stop
                     (fn [stops] (into {}  (map #(vector
                                                   (key %)
                                                   (dissoc (val %) :known-destinations)) stops))))
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

(defn- view-from-export-string [string]
  (reader/read-string (b64/decodeString (pad string 4 "="))))

(defn get-destinations-not-excluded [stop]
  (remove #(is-in-destinations (:excluded-destinations stop) %) (:known-destinations stop)))

(defn get-recent-board-views [configured-views complete-state]
  (let [views                 (map #(val %) configured-views)
        selected-views-ids    (into #{} (map #(:view-id (:params (val %))) (:split-states complete-state)))
        views-without-current (remove #(contains? selected-views-ids (:view-id %)) views)]
    (take 10 (sort-by #(- (:last-updated %)) views-without-current))))

(defn- remove-stop-and-update-date [current-view stop-id]
  (let [new-stops        (dissoc (:stops current-view) stop-id)
        new-stops-order  (vec (remove #(= stop-id %) (:stops-order current-view)))
        new-current-view (reset-sharing-infos
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
        new-current-view     (reset-sharing-infos
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

(defn- create-new-view [view]
  (let [view-id        (uuid)
        shared-view-id (uuid)]
    (update-updated-date (into {:view-id view-id :shared-view-id shared-view-id} view))))

(defn- get-shared-view [shared-view-id configured-views]
  (let [shared-view (first (filter #(= (:shared-view-id %) shared-view-id) (map val configured-views)))]
    (println shared-view)
    shared-view))

(defn swap-import-and-display-view [app imported-view]
  (swap!
    app (fn [app]
          (let [configured-views     (:configured-views app)
                complete-state       (:complete-state app)
                
                shared-view-id       (:shared-view-id imported-view)
                shared-view          (get-shared-view shared-view-id configured-views)
                view                 (or shared-view (create-new-view imported-view))
                view-id              (:view-id view)
                ; TODO this is the same as in transact-add-stop, simplify
                new-configured-views (assoc configured-views view-id view)
                current-state        (get-state complete-state :state-1)
                ; TODO this is the same as in transact-add-stop, simplify
                new-complete-state   (modify-complete-state (reset-complete-state complete-state) current-state #(go-edit % view-id))
                new-app              (assoc app
                                       :configured-views new-configured-views
                                       :complete-state new-complete-state)]
            new-app))))

(secretary/set-config! :prefix "#")
(defroute share-link "/link/*" {hash :*}
  (let [imported-view  (view-from-export-string hash)]
    (println "Got link with a view to display" imported-view)
    (swap-import-and-display-view app-state imported-view)
    (.setToken (History.) "")))

(defn- get-share-link [view]
  (str (.. js/window -location -protocol) "//" (.. js/window -location -host) "/" (share-link {:* (export-string-from-view view)})))

; Those 4 methods modify the view and will remove the shared-view-id param
; TODO move to own namespace
(defn transact-add-stop [app state stop]
  (om/transact!
    app (fn [app]
          (let [configured-views     (:configured-views app)
                complete-state       (:complete-state app)
                current-state        (get-state complete-state (:state-id state))
                is-new-view          (is-home current-state)
                edit-view-id         (:view-id (:params current-state))
                current-view         (if is-new-view (create-new-view nil) (get configured-views edit-view-id))
                view-id              (:view-id current-view)
                new-complete-state   (modify-complete-state complete-state current-state #(go-edit % view-id))
                new-view             (add-stop-and-update-date current-view stop)
                new-configured-views (assoc configured-views view-id new-view)]
            (ga "send" "event" "stop" "add" {:dimension1 (:id stop)})
            (assoc app :configured-views new-configured-views :complete-state new-complete-state)))))

(defn transact-remove-stop [app state stop-id]
  (om/transact!
    app (fn [app]
          (let [configured-views     (:configured-views app)
                complete-state       (:complete-state app)
                current-state        (get-state complete-state (:state-id state))
                current-view         (current-view current-state configured-views)
                view-id              (:view-id current-view)
                stop-id              (if-not stop-id (last (:stops-order current-view)) stop-id)
                new-view             (remove-stop-and-update-date current-view stop-id)
                new-configured-views (delete-view-if-no-stops (assoc configured-views view-id new-view) view-id)
                go-home?             (not (get new-configured-views view-id))
                new-complete-state   (modify-complete-state complete-state current-state #(if go-home? (go-home %) %))]
            (ga "send" "event" "stop" "remove" {:dimension1 stop-id})
            (assoc app :configured-views new-configured-views :complete-state new-complete-state)))))

(defn transact-toggle-filter [view arrival]
  (let [stop-id     (:stop-id arrival)
        number      (:number arrival)
        destination (:to arrival)]
    (om/transact!
      view (fn [view]
             ; we add the filter
             (let [stop                           (get (:stops view) stop-id)
                   existing-excluded-destinations (or (:excluded-destinations stop) #{})
                   is-already-excluded            (is-in-destinations existing-excluded-destinations arrival)
                   new-excluded-destinations      (if is-already-excluded
                                                    (remove-from-destinations existing-excluded-destinations arrival)
                                                    (add-to-destinations existing-excluded-destinations arrival))
                   new-current-view               (reset-sharing-infos
                                                    (update-updated-date
                                                      (assoc-in view [:stops stop-id :excluded-destinations] new-excluded-destinations)))]
               new-current-view)))))

(defn transact-fullscreen [state]
  (ga "send" "event" "fullscreen" "enter")
  (om/transact! state :params #(assoc % :display :expanded)))

(defn transact-exit-fullscreen [state]
  (ga "send" "event" "fullscreen" "exit")
  (om/transact! state :params #(dissoc % :display)))

; not used but could be useful
(defn transact-remove-filters [view]
  (om/transact! view
                (fn [view]
                  ; we remove all the filters
                  (let [stops            (:stops view)
                        new-stops-vector (map #(vector (first %) (dissoc (second %) :excluded-destinations)) stops)
                        new-current-view (reset-sharing-infos
                                           (update-updated-date
                                             (assoc view :stops (apply assoc stops (flatten new-stops-vector)))))]
                    new-current-view))))

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

(defn stop-heading [current-view owner]
  "This displays all the links"
  (reify
    om/IRender
    (render [this]
            (dom/div #js {:className "responsive-display stop-heading"}
                     (dom/h2 #js {:className "heading thin"} (str "Departures from " (str/join " / " (map #(:name %) (get-stops-in-order current-view)))))))))

(defn control-bar [{:keys [current-state current-view edit-mode]} owner]
  (reify
    om/IDidUpdate
    (did-update [_ _ prev-state]
                ; we set the focus here on share input if necessary
                (let [share-input-visible (om/get-state owner :share-input-visible)]
                  (when share-input-visible
                    (when (not (:share-input-visible prev-state))
                      (let [share-input (om/get-node owner "shareInput")]
                        (.focus share-input)))
                    ; we recalculate the share string
                    (let [prev-share-input-value (:share-input-value prev-state)
                          new-share-input-value  (get-share-link current-view)]
                      (when (not= prev-share-input-value new-share-input-value)
                        (om/set-state! owner :share-input-value new-share-input-value))))))
    om/IRenderState
    (render-state [this {:keys [share-input-value share-input-visible edit-mode-ch]}]
                  (let [excluded-destinations (remove nil? (flatten (map #(:excluded-destinations (val %)) (:stops current-view))))
                        expanded              (= :expanded (:display (:params current-state)))
                        filter-text           (if edit-mode "done filtering" "filter destinations")
                        fullscreen-text       (if expanded "exit fullscreen" "enter fullscreen")]
                    (dom/div #js {:className "control-bar"}
                             (let [on-action (fn [e]
                                               ; we change the state to hidden
                                               (if expanded
                                                 (transact-exit-fullscreen current-state)
                                                 (do
                                                   (transact-fullscreen current-state)
                                                   (put! edit-mode-ch false)))
                                               (.preventDefault e))]
                               (dom/a #js {:href "#"
                                           :aria-label fullscreen-text
                                           :onClick on-action
                                           :onTouchEnd on-action}
                                      (dom/span #js {:className (str "glyphicon " (if expanded "glyphicon-resize-small" "glyphicon-resize-full"))}) fullscreen-text))
                             (dom/span nil "|")
                             (let [on-action (fn [e]
                                               (.preventDefault e)
                                               (om/update-state! owner
                                                                 (fn [state]
                                                                   (let [share-input-value   (or (:share-input-value state)
                                                                                                 (get-share-link current-view))
                                                                         share-input-visible (not (:share-input-visible state))]
                                                                     (assoc state
                                                                       :share-input-value share-input-value
                                                                       :share-input-visible share-input-visible)))))]
                               (dom/a #js {:href "#"
                                           :aria-label "share"
                                           :onClick on-action
                                           :onTouchEnd on-action} 
                                      (dom/span #js {:className "glyphicon glyphicon-link"}) "share this board"))
                             (dom/span #js {:className "input-cell"}
                                       (let [on-action (fn [e]
                                                         ;(.select (om/get-node owner "shareInput"))
                                                         (let [share-input (om/get-node owner "shareInput")]
                                                           (.setSelectionRange share-input 0 (count (.-value share-input)))))]
                                         (dom/input #js {:aria-label "share URL"
                                                         :className (str "share-input form-control " (when-not share-input-visible "hidden"))
                                                         :ref "shareInput"
                                                         :type "text"
                                                         :value share-input-value
                                                         :onClick on-action
                                                         :onFocus on-action
                                                         :onTouchEnd on-action})))
                             (let [on-action (fn [e]
                                               (put! edit-mode-ch (not edit-mode))
                                               (.preventDefault e))]
                               (dom/a #js {:href "#"
                                           :aria-label filter-text
                                           :onClick on-action
                                           :onTouchEnd on-action}
                                      (dom/span #js {:className (str "glyphicon glyphicon-filter " (when edit-mode "hidden"))}) filter-text)))))))


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

(defn- get-all-excluded-destinations [view]
  (remove nil? (flatten (map #(:excluded-destinations (val %)) (:stops view)))))

(defn recent-board-item [{:keys [view current-state]} owner]
  (reify
    om/IRender
    (render [this]
            (dom/div #js {:className "recent-board"}
                     (let [on-click (fn [e]
                                      (om/transact! current-state #(go-edit % (:view-id view)))
                                      (.preventDefault e))]
                       (dom/a #js {:href "#"
                                   :onClick on-click
                                   :onTouchEnd on-click}
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

(defn recent-boards [{:keys [recent-views current-state]} owner]
  (reify
    om/IRender
    (render [this]
            (apply dom/div nil
                   (dom/div #js {:className "heading"}
                            (dom/h1 #js {:className "heading thin"} "Your recent boards"))
                   (map #(om/build recent-board-item {:view % :current-state current-state}) recent-views)))))

(defn strong [text]
  (dom/span #js {:className "thin"} text))

(defn welcome-banner [_ owner]
  (reify
    om/IRender
    (render [this]
            (dom/h1 #js {:className "ultra-thin welcome-banner text-center"}
                    (dom/div nil
                             "Relax and don't wait at the stop for your next "
                             (strong "bus")   " " (om/build transport-icon {:type "bus"})   ", "
                             (strong "tram")  " " (om/build transport-icon {:type "tram"})  ", "
                             (strong "train") " " (om/build transport-icon {:type "train"}) ", "
                             (strong "boat")  " " (om/build transport-icon {:type "boat"})  " or "
                             (strong "cable car") " " (om/build transport-icon {:type "cable-car"}) ".")
                    (dom/div nil "Enter any stop in "
                             (dom/div #js {:className "phoca-flagbox"}
                                      ; TODO Check this accessibility
                                      (dom/span #js {:aria-label "Switzerland"
                                                     :className  "phoca-flag ch"}))
                             " to get started.")))))

(defn stationboard-pane [{:keys [current-view current-state]} owner]
  (reify
    om/IInitState
    (init-state [_]
                {:activity-ch (chan) :toggle-filter-ch (chan) :edit-mode-ch (chan) :edit-mode false})
    om/IWillMount
    (will-mount [_]
                (let [{:keys [activity-ch
                              toggle-filter-ch
                              edit-mode-ch]} (om/get-state owner)]
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
                                  
                                  (go (<! (timeout 2000))
                                      (put! new-hide-ch true))
                                  
                                  (assoc s
                                    :activity :not-idle
                                    :hide-ch new-hide-ch))))))
                  (wait-on-channel
                    toggle-filter-ch
                    (fn [{:keys [destination]}]
                      (transact-toggle-filter current-view destination)))
                  (wait-on-channel
                    edit-mode-ch
                    (fn [edit-mode]
                      (om/set-state! owner :edit-mode edit-mode)))))
    om/IWillUnmount
    (will-unmount [this]
                  (let [{:keys [hide-ch activity-ch
                                toggle-filter-ch
                                edit-mode-ch]} (om/get-state owner)]
                    (close! activity-ch)
                    (close! edit-mode-ch)
                    (close! toggle-filter-ch)
                    (when hide-ch (close! hide-ch))))
    om/IRenderState
    (render-state [this {:keys [activity activity-ch toggle-filter-ch add-stop-ch remove-stop-ch edit-mode-ch edit-mode]}]
                  (println "Rendering stationboard pane")
                  (dom/div #js {:className (str "container-fluid " (when (= activity :idle) "activity-idle"))}
                           (om/build edit-pane
                                     {:stops (get-stops-in-order current-view)}
                                     {:opts {:display-credits false}
                                      :init-state {:add-stop-ch add-stop-ch
                                                   :remove-stop-ch remove-stop-ch}
                                      ; forces re-render
                                      :state {:random (rand)}})
                           (dom/div #js {:className "stationboard"}
                                    (om/build stop-heading current-view)
                                    (om/build control-bar
                                              {:current-state current-state :current-view current-view :edit-mode edit-mode}
                                              {:init-state {:edit-mode-ch edit-mode-ch}})
                                    (dom/div #js {:className (str "filter-container " (when edit-mode "visible"))}
                                             (om/build c-filter-editor current-view {:init-state {:toggle-filter-ch toggle-filter-ch}}))
                                    (om/build arrival-tables-view
                                              {:current-view current-view}
                                              {:init-state {:activity-ch activity-ch :toggle-filter-ch toggle-filter-ch}
                                               :opts {:refresh-rate refresh-rate
                                                      :transform-stationboard-data transform-stationboard-data}}))))))

(defn welcome-pane [{:keys [recent-views current-state]} owner]
  (reify
    om/IRenderState
    (render-state [this {:keys [add-stop-ch remove-stop-ch display-banner display-credits]}]
                  (println "Rendering welcome pane")
                  (dom/div #js {:className "container-fluid"}
                           ; TODO review this
                           (dom/div #js {:className (str "responsive-display " (when-not display-banner "hidden"))}
                                    (om/build welcome-banner nil))
                           (om/build edit-pane
                                     {:stops []}
                                     {:opts {:display-credits display-credits}
                                      :init-state {:add-stop-ch add-stop-ch
                                                   :remove-stop-ch remove-stop-ch}
                                      ; forces re-render
                                      :state {:random (rand)}})
                           (dom/div #js {:className (str "responsive-display " (when (empty? recent-views) "hidden"))}
                                    (om/build recent-boards {:recent-views recent-views :current-state current-state}))))))

(defn build-title-edit [is-split last-updated]
  (dom/span nil
            (if-not is-split (dom/div #js {:className "bold"} "Your current board")
              (dom/div nil
                       (dom/div #js {:className "bold title-split-1"} "Your left board")
                       (dom/div #js {:className "bold title-split-2"} "Your right board")))
            (dom/div #js {:className "thin"} (str "saved "
                                                  (display-time last-updated)))))

(defn build-title-home [is-split]
  (dom/span #js {:className "text-middle bold"}
            (if-not is-split "You've got Time for Coffee!"
              (dom/div nil
                       (dom/div #js {:className "title-split-1"} "Your left board")
                       (dom/div #js {:className "title-split-2"} "Your right board")))))

(defn stationboard [{:keys [current-state app]} owner]
  "Takes the app (contains all views, selected view) and renders the whole page"
  (reify
    om/IInitState
    (init-state [_]
                {:add-stop-ch (chan) :remove-stop-ch (chan) })
    om/IWillMount
    (will-mount [_]
                (let [{:keys [add-stop-ch remove-stop-ch]} (om/get-state owner)]
                  ; TODO allow the children here to modify their views directly
                  ; and listen on those view changes, see board.cljs and above for comment
                  (wait-on-channel
                    add-stop-ch
                    (fn [{:keys [stop]}]
                      (transact-add-stop app current-state stop)))
                  (wait-on-channel
                    remove-stop-ch
                    (fn [{:keys [stop-id]}]
                      (transact-remove-stop app current-state stop-id)))))
    om/IWillUnmount
    (will-unmount [this]
                  (let [{:keys [hide-ch
                                add-stop-ch remove-stop-ch]} (om/get-state owner)]
                    (close! add-stop-ch)
                    (close! remove-stop-ch)
                    (when hide-ch (close! hide-ch))))
    om/IRenderState
    (render-state [this {:keys [activity activity-ch add-stop-ch remove-stop-ch]}]
                  ; those all depend on the screen that's displayed
                  (let [configured-views (:configured-views app)
                        complete-state   (:complete-state app)
                        current-view     (current-view current-state configured-views)
                        display          (:display (:params current-state))
                        is-home          (is-home current-state)
                        is-split         (is-split complete-state)
                        display-banner   (and is-home (not is-split))
                        split-icon       (om/build menu-icon nil
                                                   {:state {:icon-class (if-not is-split "fa fa-columns" "glyphicon-remove-circle")
                                                            :hidden-text "split screen"}
                                                    :opts  {:on-click (fn [e]
                                                                        (om/transact! complete-state #(go-toggle-split % current-state))
                                                                        (.preventDefault e))}})
                        home-icon        (om/build menu-icon nil
                                                   {:state {:icon-class "glyphicon-home"
                                                            :hidden-text "go back"}
                                                    :opts  {:on-click (fn [e]
                                                                        (om/transact! current-state #(go-home %))
                                                                        (.preventDefault e))}})
                        title            (if is-home (build-title-home is-split) (build-title-edit is-split (:last-updated current-view)))]
                    
                    (println "Rendering stationboard")
                    (dom/div (clj->js {:className
                                       (str (when-not (:visible current-state) "hidden") " "
                                            (when (= display :expanded) "display-expanded") " "
                                            (name (:state-id current-state)))})
                             
                             (om/build menu-bar nil {:state {:right-icon split-icon
                                                             :left-icon (when-not is-home home-icon)
                                                             :title title}})
                             (if
                               is-home
                               (om/build welcome-pane
                                         {:recent-views (get-recent-board-views configured-views complete-state)
                                          :current-state current-state}
                                         {:init-state {:add-stop-ch add-stop-ch :remove-stop-ch remove-stop-ch}
                                          :state {:display-banner display-banner
                                                  :display-credits (not is-split)}})
                               (om/build stationboard-pane
                                         {:current-view current-view
                                          :current-state current-state}
                                         {:init-state {:add-stop-ch add-stop-ch :remove-stop-ch remove-stop-ch}})))))))

(defn split-stationboard [{:keys [complete-state] :as app} owner]
  (reify
    om/IRender
    (render [this]
            (let [states (get-all-states complete-state)
                  order  (:order complete-state)]
              (println "Rendering split stationboard")
              (apply dom/div (when (is-split complete-state)
                               (clj->js {:className (str "split-board " (name (get order 0)) "-" (name (get order 1)))}))
                     (map #(om/build stationboard {:current-state % :app app}) states))))))

(defn hook-browser-navigation! []
  (doto (History.)
    (events/listen
      EventType/NAVIGATE
      (fn [event]
        (secretary/dispatch! (.-token event))))
    (.setEnabled true)))

(defn check-if-new-visitor [app-state]
  (let [new-visitor (if (empty? app-state) true false)]
    (assoc app-state :new-visitor  new-visitor)))

(defn debug-app-state [app-state]
  (let [complete-state  (:complete-state app-state)
        state-1         (get-state complete-state :state-1)
        state-2         (get-state complete-state :state-2)]
    (if-not (or (:visible state-1) (:visible state-2))
      (assoc app-state :complete-state (reset-complete-state complete-state))
      app-state)))

(defn init! []
  (let [saved-state (or (try (reader/read-string (. js/localStorage (getItem "views"))) (catch :default e (println e) {})) {})]
    (swap! app-state deep-merge ((comp debug-app-state check-if-new-visitor) saved-state))
    (hook-browser-navigation!)))

(defn main []
  (om/root split-stationboard app-state
           {:target (. js/document (getElementById "my-app"))
            :tx-listen (fn [{:keys [path new-state]} _]
                         (. js/localStorage (setItem "views"
                                                     ; here if we don't dissoc the page will reload in the current state
                                                     (pr-str (assoc new-state :last-saved (to-long (now)))))))}))

