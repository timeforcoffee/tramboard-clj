(ns tramboard-clj.components.autocomplete
  "Here's a mockup of a basic autocompleter:
  
  <p align='center'><img src='http://arosequist.github.io/om-autocomplete/components.png' /></p>
  
  The `arosequist.om-autocomplete` namespace contains a single function, `autocomplete`, which is an Om component that handles the core autocomplete logic, but does not directly render any DOM elements. Instead, you give it three main components:
  
  1. The **container view** just holds the other two components. Typically, this will render a simple wrapper div.
  1. The **input view** is responsible for taking user input.
  1. The **results view** displays the suggestions that were generated based on the input.
  
  Some important terms are:
  
  * The input has **focus** that is either true or false, normally corresponding to the normal HTML focus. You'll often want to hide the results when the input loses focus.
  * The input also has a **value** ('uni' in the example). When this changes, the list of suggestions will be refreshed.
  * A **suggestion** can be anything. Your results view just needs to know how to display it. In the example, each suggestion contains the flag and country name.
  * The **highlighted** suggestion is usually changed by hovering the mouse or pressing the up/down arrow keys. Here, 'United States' is the highlighted suggestion.
  * A suggestion can be **selected**, typically by clicking the mouse or pressing enter. This usually signals the end of the autocomplete workflow."
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [cljs.core.async :refer [chan close! put! take! timeout]]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [tramboard-clj.script.util :refer [wait-on-channel]]
            [goog.events :as gevents]
            [clojure.string :as str]))

(defn- handle-highlight
  [owner idx]
  (let [idx (min idx (count (om/get-state owner :suggestions)))
        idx (max idx -1)]
    (om/set-state! owner :highlighted-index idx)))

(defn- handle-focus
  [owner has-focus-ch value]
  (do
    (om/set-state! owner :focused? value)
    (when has-focus-ch (put! has-focus-ch value))))

(defn- handle-value
  [owner value]
  (do
    (om/set-state! owner :value value)
    (when (str/blank? value)
      (om/set-state! owner :highlighted-index 0))))

(defn- handle-select
  [owner result-ch value-ch has-focus-ch idx]
  (let [suggestions (om/get-state owner :suggestions)
        item        (get (vec suggestions) idx)]
    (do
      (handle-focus owner has-focus-ch false)
      (put! result-ch [idx item])
      (put! value-ch ""))))

(defn- input-view [_ owner {:keys [placeholder id on-key-down]}]
  (reify
    om/IDidUpdate
    (did-update [this _ _]
                (when-not (om/get-state owner :focused?) (.blur (om/get-node owner "input"))))
    om/IRenderState
    (render-state [_ {:keys [focus-ch value-ch highlight-ch select-ch value highlighted-index mouse? displayed? focused?]}]
                  (dom/input
                    #js {:id id
                         :className "autocomplete-input edit-item"
                         :placeholder placeholder
                         :type "text"
                         :autoComplete "off"
                         :spellCheck "false"
                         :value value
                         :ref "input"
                         :onFocus (fn [e]
                                    (put! focus-ch true)
                                    (.preventDefault e))
                         :onBlur (fn [e]
                                   (do
                                     (when (not mouse?)
                                       (put! focus-ch false))
                                     true))
                         :onKeyDown (fn [e]
                                      (let [handler-fn (fn [e]
                                                         (let [keyCode (.-keyCode e)]
                                                           (case (.-keyCode e)
                                                             40 (put! highlight-ch (inc highlighted-index)) ;; up
                                                             38 (put! highlight-ch (dec highlighted-index)) ;; down
                                                             13 (when displayed? (put! select-ch highlighted-index)) ;; enter
                                                             9  (when displayed? (put! select-ch highlighted-index)) ;; tab
                                                             27 (when displayed? 
                                                                  (put! focus-ch false)) ;; esc
                                                             nil)
                                                           (when (contains? #{40 38 13 9 27} keyCode) (.preventDefault e))))]
                                        (if on-key-down (on-key-down e value handler-fn) (handler-fn e))))
                         :onChange (fn [e]
                                     (put! value-ch (.. e -target -value))
                                     (.preventDefault e))}))))

(defn- loading-default [_ owner]
  (reify
    om/IRender
    (render [_]
            (dom/li #js {:className "dropdown-results-item"} (dom/a nil "Loading...")))))

(defn- no-results-default [{:keys [value]} owner]
  (reify
    om/IRender
    (render [_]
            (dom/li #js {:className "dropdown-results-item"} (dom/a nil "No results found for " (dom/i nil value))))))

(defn- result-item-default [app owner {:keys [result-text-fn]}]
  (reify
    om/IDidMount
    (did-mount [this]
               (let [{:keys [index highlight-ch select-ch]} (om/get-state owner)
                     node (om/get-node owner)]
                 (gevents/listen node (.-MOUSEMOVE gevents/EventType) #(put! highlight-ch index))
                 (gevents/listen node (.-CLICK gevents/EventType) #(put! select-ch index))))
    
    om/IRenderState
    (render-state [_ {:keys [item index highlighted-index]}]
                  (let [highlighted? (= index highlighted-index)
                        text-fn      (if-not (nil? result-text-fn) result-text-fn identity)]
                    (dom/li #js {:className (str "dropdown-results-item" (when highlighted? " highlighted"))}
                            (dom/a #js {:href "#" :onClick (fn [e] (.preventDefault e))}
                                   (text-fn item index)))))))


(defn- results-default [app _ {:keys [loading-opts result-item-opts]}]
  (reify
    om/IRenderState
    (render-state [_ {:keys [highlight-ch select-ch value loading? focused? mouse-ch suggestions highlighted-index]}]
                  (let [display?         (and focused? value (not= value ""))
                        display-style    (if display? "block" "none")
                        attrs               #js {:className    "dropdown-results"
                                                 :style        #js {:display display-style}
                                                 :onMouseEnter (fn [e]
                                                                 (put! mouse-ch true)
                                                                 (.preventDefault e))
                                                 :onMouseLeave (fn [e]
                                                                 (put! mouse-ch false)
                                                                 (.preventDefault e))}]
                    (cond
                      (and loading? (empty? suggestions))
                      (dom/ul attrs (om/build loading-default app {:opts loading-opts}))
                      (not (empty? suggestions))
                      (apply dom/ul attrs
                             (map-indexed
                               (fn [idx item]
                                 (om/build result-item-default app {:init-state {:highlight-ch highlight-ch
                                                                                 :select-ch    select-ch}
                                                                    :state      {:item item
                                                                                 :index idx
                                                                                 :highlighted-index highlighted-index}
                                                                    :opts       result-item-opts}))
                               suggestions))
                      :otherwise (dom/ul attrs (om/build no-results-default {:value value} {:opts loading-opts})))))))

(defn autocomplete
  [cursor owner {:keys [result-ch suggestions-fn result-text-fn container-opts input-opts results results-opts]}]
  (reify
    om/IInitState
    (init-state [_]
                {:focus-ch (chan)
                 :highlight-ch (chan) :select-ch (chan)
                 :mouse-ch (chan)
                 :channels {} :highlighted-index 0})
    om/IWillMount
    (will-mount [_]
                (let [{:keys [focus-ch value-ch highlight-ch select-ch mouse-ch has-focus-ch]} (om/get-state owner)]
                  (wait-on-channel focus-ch     #(handle-focus owner has-focus-ch %))
                  (wait-on-channel value-ch     #(handle-value owner %))
                  (wait-on-channel highlight-ch #(handle-highlight owner %))
                  (wait-on-channel select-ch    #(handle-select owner result-ch value-ch has-focus-ch %))
                  (wait-on-channel mouse-ch     #(om/set-state! owner :mouse? %))))
    om/IDidUpdate
    (did-update [_ _ old]
                (let [old-value (:value old)
                      new-value (om/get-state owner :value)]
                  (when (not= old-value new-value)
                    (om/update-state!
                      owner
                      (fn [state]
                        (let [old-channels       (:channels state)
                              old-suggestions-ch (:suggestions-ch old-channels)
                              old-cancel-ch      (:cancel-suggestions-ch old-channels)
                              new-suggestions-ch (chan)
                              new-cancel-ch      (chan)]
                          (when old-suggestions-ch (close! old-suggestions-ch))
                          (when old-cancel-ch (close! old-cancel-ch))
                          (take! new-suggestions-ch
                                 (fn [suggestions]
                                   (when suggestions
                                     (om/update-state! owner (fn [s] (assoc s
                                                                       :suggestions suggestions
                                                                       :loading?    false))))))
                          
                          (suggestions-fn new-value new-suggestions-ch new-cancel-ch)
                          
                          (assoc (update-in state [:channels]
                                            #(assoc %
                                               :suggestions-ch new-suggestions-ch
                                               :cancel-suggestions-ch new-cancel-ch))
                            :loading? true)))))))
    om/IWillUnmount
    (will-unmount [_]
                  (let [{:keys [focus-ch highlight-ch select-ch mouse-ch channels]} (om/get-state owner)]
                    (close! focus-ch)
                    (close! highlight-ch)
                    (close! select-ch)
                    (close! mouse-ch)
                    (let [cancel-ch      (:cancel-suggestions-ch channels)
                          suggestions-ch (:suggestions-ch channels)]
                      (when cancel-ch (close! cancel-ch))
                      (when suggestions-ch (close! suggestions-ch)))))
    om/IRenderState
    (render-state [_ {:keys [focus-ch value-ch highlight-ch select-ch mouse-ch value
                             highlighted-index loading? focused? mouse? suggestions]}]
                  (dom/div #js {:className "dropdown-wrapper"}
                           (dom/div #js {:className "autocomplete-input-container"}
                                    (dom/a #js {:className (str "autocomplete-input-load " (when-not loading? "hidden"))}
                                           (dom/i #js {:className "fa fa-spinner fa-spin"}))
                                    (om/build input-view cursor
                                              {:init-state {:focus-ch       focus-ch
                                                            :value-ch       value-ch
                                                            :highlight-ch   highlight-ch
                                                            :select-ch      select-ch}
                                               :state {:value             value
                                                       :highlighted-index highlighted-index
                                                       :displayed?        (> (count suggestions) 0)
                                                       :mouse?            mouse?
                                                       :focused?          focused?}
                                               :opts input-opts})
                                    (dom/a #js {:className (str "autocomplete-input-delete " (when (str/blank? value) "hidden"))
                                                :href "#"
                                                :onClick (fn [e]
                                                           (put! value-ch "")
                                                           (.preventDefault e))} (dom/i #js {:className "fa fa-times"} "")))
                           (let [results-view (if-not (nil? results) results results-default)]
                             (om/build results-view cursor
                                       {:init-state {:highlight-ch highlight-ch
                                                     :select-ch    select-ch
                                                     :mouse-ch     mouse-ch}
                                        :state {:value             value
                                                :loading?          loading?
                                                :focused?          focused?
                                                :suggestions       suggestions
                                                :highlighted-index highlighted-index}
                                        :opts (assoc-in results-opts [:result-item-opts :result-text-fn] result-text-fn)}))))))
