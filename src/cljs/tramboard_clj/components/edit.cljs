(ns tramboard-clj.components.edit
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [cljs.core.async :refer [put! chan <! >! close! timeout]]
            [clojure.string :as str]
            [goog.array :as g-array]
            [tramboard-clj.script.client :refer [fetch-suggestions]]
            [tramboard-clj.script.util :refer [wait-on-channel get-stops-in-order]]
            [arosequist.om-autocomplete :as ac]
            [arosequist.om-autocomplete.bootstrap :as acb]))

(defn- autocomplete [_ owner {:keys [input-id input-placeholder input-class-name results-class-name container-class-name]}]
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
    (render-state [_ {:keys [result-ch backspace-ch input-ch input-focus-ch]}]
                  (om/build ac/autocomplete {}
                            {:opts
                             {:suggestions-fn (fn [value suggestions-ch cancel-ch]
                                                (if (str/blank? value) 
                                                  (do 
                                                    (put! suggestions-ch [])
                                                    (put! input-ch false))
                                                  (do
                                                    (fetch-suggestions value suggestions-ch cancel-ch identity)
                                                    (put! input-ch true))))
                              :result-ch      result-ch
                              :result-text-fn (fn [item _] (:name item))
                              :results-opts {:class-name results-class-name
                                             :result-item-opts {:class-name-highlighted "highlighted"}}
                              :container-opts {:class-name container-class-name}
                              :input-opts     {:placeholder    input-placeholder
                                               :id             input-id
                                               :class-name     input-class-name
                                               :input-focus-ch input-focus-ch
                                               :on-key-down    (fn [e value handler]
                                                                 (let [keyCode (.-keyCode e)]
                                                                   (case (.-keyCode e)
                                                                     8  (when (empty? value) (put! backspace-ch true))
                                                                     (handler e))))}}}))))

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
                                :onClick on-click}
                           name)))))

(defn edit-stop-heading [{:keys [stops]} owner]
  "This displays all the links"
  (reify
    om/IRenderState
    (render-state [this {:keys [remove-stop-ch show-edit-ch input-focus-ch]}]
                  (dom/div #js {:className "responsive-display edit-stop-heading"}
                           (dom/h2 #js {:className "thin"} "Your next departures from: ")
                           (apply dom/div #js {:className " edit-stop-heading-buttons thin"} 
                                  (conj
                                    (into [] (map #(om/build edit-remove-button
                                                             {:current-stop %}
                                                             {:init-state {:remove-stop-ch remove-stop-ch}}) stops))
                                    (dom/label #js {:className "edit-stop-heading-add" 
                                                    :htmlFor "stopInput"
                                                    :href "#"
                                                    :onClick (fn [e] 
                                                               (put! show-edit-ch true)
                                                               (put! input-focus-ch true))} "add a stop")))))))

(defn edit-pane [{:keys [stops]} owner {:keys [display-credits]}]
  "This shows the edit pane to add stops and stuff"
  (reify
    om/IInitState
    (init-state [_]
                {:backspace-ch (chan) :show-edit-ch (chan) :input-focus-ch (chan) :show-edit false})
    om/IWillMount
    (will-mount  [_]
                (let [{:keys [backspace-ch remove-stop-ch show-edit-ch]} (om/get-state owner)]
                  (wait-on-channel
                    backspace-ch
                    (fn [backspace]
                      (when (not (nil? backspace))
                        (put! remove-stop-ch {:stop-id nil}))))
                  (wait-on-channel
                    show-edit-ch
                    (fn [show-edit]
                      (om/set-state! owner :show-edit show-edit)))))
    om/IWillUnmount
    (will-unmount [_]
                  (let [{:keys [backspace-ch show-edit-ch input-focus-ch]} (om/get-state owner)]
                    (close! backspace-ch)
                    (close! input-focus-ch)
                    (close! show-edit-ch)))
    om/IRenderState
    (render-state [_ {:keys [backspace-ch input-ch buttons-width input-width add-stop-ch remove-stop-ch show-edit-ch input-focus-ch show-edit]}]
                  (let [no-stops (= (count stops) 0)]
                    (dom/div #js {:className "edit-form"}
                             (dom/div #js {:className (when no-stops "hidden")}
                                      (om/build edit-stop-heading {:stops stops} {:init-state {:show-edit-ch show-edit-ch :remove-stop-ch remove-stop-ch :input-focus-ch input-focus-ch}}))
                             (dom/div #js {:className (when (and (not show-edit) (not no-stops)) "hidden")}
                                      (om/build autocomplete nil
                                                {:init-state {:backspace-ch backspace-ch :add-stop-ch add-stop-ch :input-ch input-ch :input-focus-ch input-focus-ch}
                                                 :opts {:input-id             "stopInput"
                                                        :input-placeholder    "Enter a stop"
                                                        :input-class-name     "thin edit-form-input"
                                                        :results-class-name   "edit-form-results no-link"}})
                                      
                                      (dom/div #js {:className (str "text-right ultra-thin credits " (when-not display-credits "hidden"))}
                                               "brought to you by "
                                               (dom/a #js {:target "_blank" :href "/about"} "Time for Coffee team"))))))))
