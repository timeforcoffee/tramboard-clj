(ns tramboard-clj.components.edit
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [cljs.core.async :refer [put! chan <! >! close! timeout]]
            [clojure.string :as str]
            [goog.array :as g-array]
            [tramboard-clj.script.client :refer [fetch-suggestions]]
            [tramboard-clj.script.util :refer [wait-on-channel get-stops-in-order]]
            [tramboard-clj.components.util :refer [flag]]
            [arosequist.om-autocomplete :as ac]
            [arosequist.om-autocomplete.bootstrap :as acb]))

(defn- autocomplete [_ owner {:keys [input-id input-placeholder]}]
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
                                                                       8  (when (empty? value) (put! backspace-ch true))
                                                                       (handler e))))}}})))))

(defn- edit-remove-button [{:keys [current-stop]} owner]
  (reify
    om/IRenderState
    (render-state [this {:keys [remove-stop-ch]}]
                  (let [stop-id (:id current-stop)
                        name    (:name current-stop)]
                    (dom/button #js {:className "btn btn-primary"
                                     :type "button"
                                     :aria-label (str "remove " name)
                                     :onClick (fn [e]
                                                (put! remove-stop-ch {:stop-id stop-id})
                                                (.preventDefault e))}
                                name
                                (dom/span #js {:className "glyphicon glyphicon-remove"}))))))

(defn edit-pane [{:keys [stops location]} owner {:keys [display-credits]}]
  "This shows the edit pane to add stops and stuff"
  (let [set-sizes
        (fn [current-owner prev-state]
          (println "Setting new sizes")
          (let [button-padding     4   ; TODO link this to CSS somehow
                min-input-width    200 ; TODO link this to CSS somehow
                input-padding      42  ; TODO link this to CSS somehow
                container          (om/get-node current-owner "container")
                container-width    (.-offsetWidth container)
                buttons            (g-array/toArray (.-children (om/get-node current-owner "buttons")))
                buttons-width      (apply + (map #(+ button-padding (.-offsetWidth %)) buttons))
                new-buttons-width  (if (< container-width buttons-width) container-width buttons-width)
                prev-buttons-width (when prev-state (:buttons-width prev-state))
                new-input-width    (- (if (< (- container-width new-buttons-width) min-input-width) container-width (- container-width new-buttons-width)) input-padding)
                prev-input-width   (when prev-state (:input-width prev-state))]
            (when (or (nil? prev-buttons-width) (not= prev-buttons-width new-buttons-width))
              (println "setting new size for button")
              (om/set-state! current-owner :buttons-width new-buttons-width))
            (when (or (nil? prev-input-width) (not= prev-input-width new-input-width))
              (println "setting new size for input" new-input-width)
              (om/set-state! current-owner :input-width new-input-width))))]
    (reify
      om/IInitState
      (init-state [_]
                  {:backspace-ch (chan)})
      om/IWillMount
      (will-mount  [_]
                  (let [{:keys [backspace-ch remove-stop-ch]} (om/get-state owner)]
                    (wait-on-channel
                      backspace-ch
                      (fn [backspace]
                        (when (not (nil? backspace))
                          (put! remove-stop-ch {:stop-id nil}))))))
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
      (render-state [_ {:keys [backspace-ch buttons-width input-width add-stop-ch remove-stop-ch]}]
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
                                                        (map #(om/build edit-remove-button
                                                                        {:current-stop %}
                                                                        {:init-state {:remove-stop-ch remove-stop-ch}}) stops))
                                                 (om/build autocomplete nil
                                                           {:init-state {:backspace-ch backspace-ch :add-stop-ch add-stop-ch}
                                                            :state {:input-style #js {:width (str input-width "px")}}
                                                            :opts {:input-id          "stopInput"
                                                                   :input-placeholder "Enter a stop"}})
                                                 (dom/span #js {:className ""}
                                                           (om/build flag {:country (:flag-class location) :label (:short-label location)})))))))))
