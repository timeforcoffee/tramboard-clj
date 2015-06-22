(ns tramboard-clj.components.edit
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [cljs.core.async :refer [put! chan <! >! close! timeout]]
            [clojure.string :as str]
            [goog.array :as g-array]
            [tramboard-clj.script.client :refer [fetch-suggestions]]
            [tramboard-clj.script.util :refer [wait-on-channel get-stops-in-order]]
            [tramboard-clj.components.util :refer [flag]]
            [tramboard-clj.components.location :refer [location-item]]
            [tramboard-clj.components.autocomplete :refer [autocomplete]]))

(defn- edit-input [{:keys [location]} owner {:keys [input-id input-placeholder input-class-name results-class-name container-class-name]}]
  (reify
    om/IInitState
    (init-state [_]
                {:result-ch (chan)})
    om/IWillMount
    (will-mount [_]
                (let [{:keys [result-ch add-stop-ch]} (om/get-state owner)]
                  (wait-on-channel
                    result-ch
                    (fn [output]
                      (let [[idx result] output]
                        (when (not (nil? result))
                          (put! add-stop-ch {:stop result})))))))
    om/IRenderState
    (render-state [_ {:keys [result-ch has-input-ch value-ch has-focus-ch]}]
                  (om/build autocomplete nil
                            {:init-state {:value-ch value-ch
                                          :has-focus-ch has-focus-ch}
                             :state {:suggestions []
                                     :value ""}
                             :opts
                             {:suggestions-fn (fn [value suggestions-ch cancel-ch]
                                                (if (str/blank? value)
                                                  (do
                                                    (put! has-input-ch false)
                                                    (put! suggestions-ch []))
                                                  (do
                                                    (put! has-input-ch true)
                                                    (fetch-suggestions value #(:api location) suggestions-ch cancel-ch identity))))
                              :result-ch      result-ch
                              :result-text-fn (fn [item _] (:name item))
                              :input-opts     {:placeholder    input-placeholder
                                               :id             input-id
                                               :class-name     input-class-name}}}))))

(defn- edit-remove-button [{:keys [current-stop]} owner]
  (reify
    om/IRenderState
    (render-state [this {:keys [remove-stop-ch]}]
                  (let [stop-id  (:id current-stop)
                        name     (:name current-stop)
                        on-click (fn [e]
                                   (put! remove-stop-ch {:stop-id stop-id})
                                   (.preventDefault e))]
                    (dom/a #js {:className "btn btn-default edit-stop-heading-remove"
                                :aria-label (str "remove " name)
                                :onClick on-click} name)))))

(defn edit-stop-heading [{:keys [stops]} owner]
  "This displays all the links"
  (reify
    om/IRenderState
    (render-state [this {:keys [remove-stop-ch show-edit-ch show-edit]}]
                  (dom/div #js {:className "responsive-display edit-stop-heading"}
                           (dom/h2 #js {:className "edit-stop-heading-title thin"} "Your next departures from: ")
                           (apply dom/div #js {:className " edit-stop-heading-buttons thin"}
                                  (conj
                                    (into [] (map #(om/build edit-remove-button
                                                             {:current-stop %}
                                                             {:init-state {:remove-stop-ch remove-stop-ch}}) stops))
                                    (dom/a #js {:href "#"
                                                :className (when show-edit "hidden")}
                                           (dom/label #js {:className "edit-stop-heading-add"
                                                           :htmlFor "stopInput"
                                                           :onClick (fn [e]
                                                                      (put! show-edit-ch true)
                                                                      (.stopPropagation e))}  "add a stop"))))))))

(defn edit-pane [{:keys [stops location display-credits locations] :as state} owner]
  "This shows the edit pane to add stops and stuff"
  (reify
    om/IInitState
    (init-state [_]
                {:show-edit false :show-edit-ch (chan) :has-focus-ch (chan)})
    om/IWillMount
    (will-mount  [_]
                (let [{:keys [remove-stop-ch show-edit-ch has-focus-ch]} (om/get-state owner)]
                  (wait-on-channel
                    show-edit-ch
                    (fn [show-edit]
                      (om/set-state! owner :show-edit show-edit)))
                  (wait-on-channel
                    has-focus-ch
                    (fn [has-focus]
                      (when-not (or has-focus (om/get-state owner :always-show))
                        (om/set-state! owner :show-edit false))))))
    om/IWillUnmount
    (will-unmount [this]
                  (let [{:keys [show-edit-ch has-focus-ch value-ch]} (om/get-state owner)]
                    (close! has-focus-ch)
                    (close! show-edit-ch)))
    om/IDidUpdate
    (did-update [this _ {old-always-show :always-show}]
                (let [{always-show :always-show} (om/get-state owner)]
                  (when (not= old-always-show always-show)
                    (if always-show
                      (om/set-state! owner :show-edit true)
                      (om/set-state! owner :show-edit false)))))
    om/IRenderState
    (render-state [_ {:keys [has-input-ch buttons-width input-width add-stop-ch remove-stop-ch show-edit-ch location-ch show-edit value-ch has-focus-ch]}]
                  (let [no-stops (= (count stops) 0)]
                    (dom/div nil
                             (dom/div #js {:className (when no-stops "hidden")}
                                      (om/build edit-stop-heading {:stops stops}
                                                {:init-state {:show-edit-ch show-edit-ch
                                                              :remove-stop-ch remove-stop-ch}
                                                 :state {:show-edit show-edit}}))
                             (dom/div #js {:className (str "edit-form-stop-container no-link " (when show-edit "visible"))}
                                      (om/build edit-input {:location location}
                                                {:init-state {:add-stop-ch add-stop-ch
                                                              :has-input-ch has-input-ch
                                                              :value-ch value-ch
                                                              :has-focus-ch has-focus-ch}
                                                 :opts {:input-id             "stopInput"
                                                        :input-placeholder    "Enter a stop"}})))))))
