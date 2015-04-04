(ns tramboard-clj.script.tram
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [cljs.core.async :refer [put! chan <! >! close! timeout]]
            [clojure.string :as str]
            [cljs-time.core :refer [now]]
            [cljs-time.coerce :refer [to-long from-long]]
            [cljs-uuid.core :as uuid]
            [arosequist.om-autocomplete :as ac]
            [arosequist.om-autocomplete.bootstrap :as acb]
            [cljs.reader :as reader]
            [secretary.core :as secretary :refer-macros [defroute]]
            [goog.array :as g-array]
            [goog.events :as events]
            [goog.history.EventType :as EventType]
            [goog.crypt.base64 :as b64]
            [tramboard-clj.components.icon :refer [number-icon transport-icon]]
            [tramboard-clj.components.filter :refer [c-filter-editor]]
            [tramboard-clj.components.board :refer [arrival-tables-view]]
            [tramboard-clj.script.time :refer [display-time]]
            [tramboard-clj.script.client :refer [fetch-suggestions]]
            [tramboard-clj.script.util :refer [is-in-destinations wait-on-channel ga]]
            [tramboard-clj.script.state :refer [is-home is-edit is-split get-state go-home go-edit go-toggle-split modify-complete-state get-all-states reset-complete-state]])
  (:import [goog.net XhrIo]
           goog.History))

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

(defn- cap [string x letter]
  (if (= 0 (- x (count string))) string (cap (str letter string) x letter)))

(defn- reset-sharing-infos [view]
  (assoc view :shared-view-id (uuid)))

(defn- update-updated-date [view]
  (assoc view :last-updated (to-long (now))))

(defn current-view [current-state configured-views]
  (let [view-id (:view-id (:params current-state))]
    (get configured-views view-id)))

(defn get-stops-in-order [view]
  (map #(get (:stops view) %) (:stops-order view)))

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
                is-new-view          (not (is-edit current-state))
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

(defn transact-add-filter [view arrival]
  (let [stop-id     (:stop-id arrival)
        number      (:number arrival)
        destination (:to arrival)
        colors      (:colors arrival)]
    (om/transact!
      view (fn [view]
             ; we add the filter
             (let [stop                           (get (:stops view) stop-id)
                   existing-excluded-destinations (or (:excluded-destinations stop) #{})
                   new-excluded-destinations      (conj existing-excluded-destinations {:to destination :number number})
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

(defn stop-heading [current-view owner]
  "This displays all the links"
  (reify
    om/IRender
    (render [this]
            (dom/div #js {:className "stop-heading"}
                     (dom/h2 #js {:className "heading thin"} (str "Departures from " (str/join " / " (map #(:name %) (get-stops-in-order current-view)))))))))

(defn control-bar [{:keys [current-state current-view]} owner]
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
    (render-state [this {:keys [share-input-value share-input-visible]}]
                  (let [excluded-destinations (remove nil? (flatten (map #(:excluded-destinations (val %)) (:stops current-view))))
                        expanded              (= :expanded (:display (:params current-state)))
                        fullscreen-text       (if expanded "exit fullscreen" "fullscreen")]
                    (dom/div #js {:className "control-bar"}
                             (dom/div #js {:className "first-cell"}
                                       (dom/a #js {:href "#"
                                                   :className (str "link-icon glyphicon " (if expanded "glyphicon-resize-small" "glyphicon-resize-full"))
                                                   :aria-label fullscreen-text
                                                   :onClick (fn [e]
                                                              ; we change the state to hidden
                                                              (if expanded
                                                                (transact-exit-fullscreen current-state)
                                                                (transact-fullscreen current-state))
                                                              (.preventDefault e))}))
                             (dom/div #js {:className "remove-filter-cell"}
                                       (dom/a #js {:href "#"
                                                   :className "remove-filter link-icon"
                                                   :onClick (fn [e]
                                                              (.preventDefault e)
                                                              (transact-remove-filters current-view))}
                                              (dom/span #js {:className (when (empty? excluded-destinations) "hidden")}
                                                        (dom/span #js {:className "remove-filter-image"} "✖") (dom/span #js {:className "remove-filter-text thin"} "remove filters"))))
                             (dom/div #js {:className "input-cell"}
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
                                                       :onTouchStart on-action})))
                             (dom/div #js {:className "share-link"}
                                       (dom/a #js {:href "#"
                                                   :className "link-icon glyphicon glyphicon-link"
                                                   :aria-label "share"
                                                   :onClick (fn [e]
                                                              (.preventDefault e)
                                                              (om/update-state! owner
                                                                                (fn [state]
                                                                                  (let [share-input-value   (or (:share-input-value state)
                                                                                                                (get-share-link current-view))
                                                                                        share-input-visible (not (:share-input-visible state))]
                                                                                    (assoc state
                                                                                      :share-input-value share-input-value
                                                                                      :share-input-visible share-input-visible)))))})))))))


(defn autocomplete [{:keys [app current-state]} owner {:keys [input-id input-placeholder]}]
  (reify
    om/IInitState
    (init-state [_]
                {:result-ch (chan)})
    om/IWillMount
    (will-mount [_]
                (let [result-ch (om/get-state owner :result-ch)]
                  (wait-on-channel
                    result-ch
                    (fn [output]
                      (let [[idx result] output]
                        (when (not (nil? result))
                          (transact-add-stop app current-state result)))))))
    om/IRenderState
    (render-state [_ {:keys [result-ch backspace-ch input-style]}]
                  (om/build ac/autocomplete {}
                            (acb/add-bootstrap-m
                              {:state {:input-state {:style input-style}}
                               :opts
                               {:suggestions-fn (fn [value suggestions-ch cancel-ch]
                                                  (if (str/blank? value) (put! suggestions-ch [])
                                                    (fetch-suggestions value suggestions-ch cancel-ch identity)))
                                :result-ch      result-ch
                                :result-text-fn (fn [item _] (:name item))
                                :input-opts     {:placeholder    input-placeholder
                                                 :id             input-id
                                                 :on-key-down    (fn [e value handler]
                                                                   (let [keyCode (.-keyCode e)]
                                                                     (case (.-keyCode e)
                                                                       8  (when (str/blank? value) (put! backspace-ch true))
                                                                       (handler e))))}}})))))

(defn edit-remove-button [{:keys [current-stop app current-state]} owner]
  (reify
    om/IRender
    (render [this]
            (let [stop-id (:id current-stop)
                  name    (:name current-stop)]
              (dom/button #js {:className "btn btn-primary"
                               :type "button"
                               :aria-label (str "remove " name)
                               :onClick (fn [e]
                                          (transact-remove-stop app current-state stop-id)
                                          (.preventDefault e))}
                          name
                          (dom/span #js {:className "glyphicon glyphicon-remove"}))))))


(defn edit-pane [{:keys [app current-state]} owner]
  "This shows the edit pane to add stops and stuff"
  (let [set-sizes
        (fn [current-owner prev-state]
          (let [button-padding     4   ; TODO link this to CSS somehow
                min-input-width    200 ; TODO link this to CSS somehow
                input-padding      42  ; TODO link this to CSS somehow
                container          (om/get-node current-owner "container")
                container-width    (.-offsetWidth container)
                buttons            (g-array/toArray (.-children (om/get-node current-owner "buttons")))
                buttons-width      (apply + (map #(+ button-padding (.-offsetWidth %)) buttons))
                new-buttons-width  (if (< container-width buttons-width) container-width buttons-width)
                prev-buttons-width (:buttons-width prev-state)
                new-input-width    (- (if (< (- container-width new-buttons-width) min-input-width) container-width (- container-width new-buttons-width)) input-padding)
                prev-input-width   (:input-width prev-state)]
            (when (or (nil? prev-buttons-width) (not= prev-buttons-width new-buttons-width))
              (om/set-state! current-owner :buttons-width new-buttons-width))
            (when (or (nil? prev-input-width) (not= prev-input-width new-input-width))
              (om/set-state! current-owner :input-width new-input-width))))]
    (reify
      om/IInitState
      (init-state [_]
                  {:backspace-ch (chan)})
      om/IWillMount
      (will-mount  [_]
                  (let [backspace-ch (om/get-state owner :backspace-ch)]
                    (wait-on-channel
                      backspace-ch
                      (fn [backspace]
                        (when (not (nil? backspace)) (transact-remove-stop app current-state nil))))))
      om/IWillUnmount
      (will-unmount [_]
                    (let [{:keys [backspace-ch]} (om/get-state owner)]
                      (close! backspace-ch)))
      om/IDidMount
      (did-mount [_]
                 (set-sizes owner (om/get-state owner)))
      om/IDidUpdate
      (did-update [_ _ prev-state]
                  (set-sizes owner prev-state))
      om/IRenderState
      (render-state [_ {:keys [backspace-ch buttons-width input-width]}]
                    (let [configured-views (:configured-views app)
                          current-view     (current-view current-state configured-views)
                          is-home          (is-home current-state)]

                      (println "Rendering edit-pane")
                      (dom/form #js {:className "edit-form" :role "search"}
                                (dom/div #js {:className "form-group form-group-lg"}
                                         (dom/label #js {:className "control-label sr-only"
                                                         :htmlFor   "stopInput"} "Enter a stop")
                                         (dom/span #js {:className "form-control thin"
                                                        :ref       "container"}
                                                   (apply dom/span #js {:className "buttons"
                                                                        :ref       "buttons"
                                                                        :style     #js {:width (str buttons-width "px")}}
                                                          (map #(om/build edit-remove-button {:app app :current-stop % :configured-views configured-views :current-state current-state}) (get-stops-in-order current-view)))
                                                   (om/build autocomplete {:app app :configured-views configured-views :current-state current-state}
                                                             {:init-state {:backspace-ch   backspace-ch}
                                                              :state {:input-style #js {:width (str input-width "px")}}
                                                              :opts {:input-id          "stopInput"
                                                                     :input-placeholder "Enter a stop"}}))
                                         (dom/div #js {:className (str "text-right ultra-thin credits " (when-not is-home "hidden"))}
                                                  "brought to you by "
                                                  (dom/a #js {:target "_blank" :href "/about"} "Time for Coffee team")))))))))

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

(defn recent-board-item [{:keys [configured-view current-state]} owner]
  (reify
    om/IRender
    (render [this]
            (dom/div #js {:className "recent-board"}
                     (dom/a #js {:href "#"
                                 :onClick (fn [e]
                                            (om/transact! current-state #(go-edit % (:view-id configured-view)))
                                            (.preventDefault e))}
                            ; a list of all stops
                            (dom/h2 #js {:className "thin"}
                                    (str (str/join " / " (map #(:name %) (get-stops-in-order configured-view)))
                                         ; TODO maybe do this ?
                                         ;(when (not (empty? (get-all-excluded-destinations configured-view))) " (with filters)")
                                    ))
                            ; a thumbnail of all trams
                            (dom/div #js {:className "number-list"}
                                     (let [numbers         (->> (:stops configured-view)
                                                                (map #(get-destinations-not-excluded (val %)))
                                                                (reduce into #{})
                                                                (map #(select-keys % [:number :colors :type]))
                                                                (distinct)
                                                                (sort-by #(cap (:number %) 20 "0")))
                                           too-big         (> (count numbers) 9)
                                           numbers-to-show (if too-big (conj (vec (take 8 numbers)) {:number "..."}) numbers)]
                                       (apply dom/ul #js {:className "list-inline"} (om/build-all recent-board-item-number numbers-to-show)))))))))

(defn recent-boards [{:keys [app current-state]} owner]
  (reify
    om/IRender
    (render [this]
            (let [configured-views (:configured-views app)
                  complete-state   (:complete-state app)
                  recent-views     (get-recent-board-views configured-views complete-state)]
              (apply dom/div nil
                     (dom/div #js {:className "heading"}
                              (dom/h1 #js {:className "heading thin"} "Your recent boards"))
                     (map #(om/build recent-board-item {:configured-view % :current-state current-state}) recent-views))))))

(defn menu-icon [_ owner {:keys [on-click]}]
  (reify
    om/IRenderState
    (render-state [this {:keys [span-class icon-class hidden-text]}]
                  (dom/span #js {:className span-class}
                            (dom/a #js {:className (str "link-icon glyphicon " icon-class)
                                        :href "#"
                                        :aria-label hidden-text
                                        :onClick on-click})))))


; TODO change this so it has as input: 1. display-home 2. display-split 3. title
(defn menu-bar [{:keys [app current-state]} owner]
  (reify
    om/IRender
    (render [this]
            (let [complete-state    (:complete-state app)
                  is-split          (is-split complete-state)
                  split-screen-icon (om/build menu-icon nil
                                              {:state {:span-class "split-link pull-right"
                                                       :icon-class (if-not is-split "fa fa-columns" "glyphicon-remove-circle")
                                                       :hidden-text "split screen"}
                                               :opts  {:on-click (fn [e]
                                                                   (om/transact! complete-state #(go-toggle-split % current-state))
                                                                   (.preventDefault e))}})]
              (dom/header #js {:className "menu-bar"}
                          (dom/div #js {:className "container-fluid"}
                                   (cond
                                     (is-edit current-state)
                                     (let [configured-views  (:configured-views app)
                                           current-view      (current-view current-state configured-views)
                                           back-icon         (om/build menu-icon nil
                                                                       {:state {:span-class "back-link pull-left"
                                                                                :icon-class "glyphicon-home"
                                                                                :hidden-text "go back"}
                                                                        :opts  {:on-click (fn [e]
                                                                                            (om/transact! current-state #(go-home %))
                                                                                            (.preventDefault e))}})]
                                       (dom/div nil
                                                back-icon
                                                (dom/span nil
                                                          (if-not is-split (dom/div #js {:className "bold"} "Your current board")
                                                            (dom/div nil
                                                                     (dom/div #js {:className "bold title-split-1"} "Your left board")
                                                                     (dom/div #js {:className "bold title-split-2"} "Your right board")))
                                                          (dom/div #js {:className "thin"} (str "saved "
                                                                                                (display-time (:last-updated current-view)))))
                                                split-screen-icon))
                                     (is-home current-state)
                                     (dom/div nil
                                              (dom/span #js {:className "text-middle bold"}
                                                        (if-not is-split "You've got Time for Coffee!"
                                                          (dom/div nil
                                                                   (dom/div #js {:className "title-split-1"} "Your left board")
                                                                   (dom/div #js {:className "title-split-2"} "Your right board"))))
                                              split-screen-icon))))))))

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
                                                     :className "phoca-flag ch"}))
                             " to get started.")))))

(defn stationboard [{:keys [current-state app]} owner]
  "Takes the app (contains all views, selected view) and renders the whole page, knows what to display based on the routing."
  (reify
    om/IInitState
    (init-state [_]
                {:activity-ch (chan) :add-filter-ch (chan)})
    om/IWillMount
    (will-mount [_]
                (let [{:keys [activity-ch add-filter-ch]} (om/get-state owner)]
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
                    add-filter-ch
                    (fn [{:keys [:view :destination]}]
                      (transact-add-filter view destination)))))
    om/IWillUnmount
    (will-unmount [this]
                  (let [{:keys [hide-ch activity-ch add-filter-ch]} (om/get-state owner)]
                    (close! activity-ch)
                    (close! add-filter-ch)
                    (when hide-ch (close! hide-ch))))
    om/IRenderState
    (render-state [this {:keys [activity activity-ch add-filter-ch]}]
                  ; those all depend on the screen that's displayed
                  (let [configured-views (:configured-views app)
                        complete-state   (:complete-state app)
                        current-view     (current-view current-state configured-views)
                        display          (:display (:params current-state))
                        recent-views     (get-recent-board-views configured-views complete-state)
                        display-banner   (and (is-home current-state) (not (is-split complete-state)))]

                    (println "Rendering stationboard")
                    (dom/div (clj->js {:className
                                       (str (when-not (:visible current-state) "hidden") " "
                                            (when (= display :expanded) "display-expanded") " "
                                            (when (= activity :idle)    "activity-idle") " "
                                            (name (:state-id current-state)))})

                             (om/build menu-bar {:app app :current-state current-state})
                             (dom/div #js {:className "container-fluid"}
                                      (dom/div #js {:className (str "responsive-display " (when-not display-banner "hidden"))}
                                               (om/build welcome-banner nil))
                                      (om/build edit-pane {:app app :current-state current-state})
                                      (cond
                                        (is-home current-state)
                                        (dom/div #js {:className (str "responsive-display " (when (empty? recent-views) "hidden"))}
                                                 (om/build recent-boards {:app app :current-state current-state}))
                                        (is-edit current-state)
                                        (dom/div #js {:className "responsive-display"}
                                                 (om/build c-filter-editor [])
                                                 (om/build stop-heading current-view)
                                                 (om/build control-bar {:current-state current-state :current-view current-view})
                                                 (om/build arrival-tables-view
                                                           {:current-view current-view}
                                                           {:init-state {:activity-ch activity-ch}
                                                            :opts {:refresh-rate refresh-rate :add-filter-ch add-filter-ch}})))))))))

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

(defn application [app-state owner]
  (reify
    om/IRender
    (render [this]
            (let [ask-location (:ask-location app-state)]
              (if
                ; ask-location
                false
                (dom/div nil "PROUT")
                (om/build split-stationboard app-state))))))

(defn hook-browser-navigation! []
  (doto (History.)
    (events/listen
      EventType/NAVIGATE
      (fn [event]
        (secretary/dispatch! (.-token event))))
    (.setEnabled true)))

(defn check-if-should-ask-location [app-state]
  (let [ask-location (if (empty? app-state) true false)]
    (assoc app-state :ask-location ask-location)))

(defn debug-app-state [app-state]
  (let [complete-state  (:complete-state app-state)
        state-1         (get-state complete-state :state-1)
        state-2         (get-state complete-state :state-2)]
    (if-not (or (:visible state-1) (:visible state-2))
      (assoc app-state :complete-state (reset-complete-state complete-state))
      app-state)))

(defn init! []
  (let [saved-state (or (try (reader/read-string (. js/localStorage (getItem "views"))) (catch :default e (println e) {})) {})]
    (swap! app-state deep-merge ((comp debug-app-state check-if-should-ask-location) saved-state))
    (hook-browser-navigation!)))

(defn main []
  (om/root application app-state
           {:target (. js/document (getElementById "my-app"))
            :tx-listen (fn [{:keys [path new-state]} _]
                         (. js/localStorage (setItem "views"
                                                     ; here if we don't dissoc the page will reload in the current state
                                                     (pr-str (assoc new-state :last-saved (to-long (now)))))))}))

