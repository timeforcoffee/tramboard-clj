(ns tramboard-clj.script.state
  "This namespace deals with state functions and manipulations. The complete state of the app is the
  state of both split panes. Each pane's state is represented by a state structure contained in
  a map with 2 named items, like this :
  :split-states {:state-1 {:state-id :state-1 :state :home :params {} :visible true}
  :state-2 {:state-id :state-2 :state :home :params {} :visible false}}
  :order [:state-1 :state-2]}
  When referring to complete state, one means the whole structure above. When referring to state, one
  means one of the 2 states inside the complete state.")

(defn get-state [complete-state state-id]
  "Returns the state for the given state id"
  (get (:split-states complete-state) state-id))

(defn is-home [state]
  (= :home (:state state)))

(defn is-edit [state]
  (= :edit (:state state)))

(defn is-split [complete-state]
  (let [split-states (:split-states complete-state)
        state-1      (get split-states :state-1)
        state-2      (get split-states :state-2)]
    (and (:visible state-1) (:visible state-2))))

(defn go-home [state]
  (assoc state :state :home :params {}))

(defn go-edit [state view-id]
  (assoc state :state :edit :params {:view-id view-id}))

(defn- go-hide [state]
  (go-home (assoc state :visible false)))

(defn- go-show [state]
  (assoc state :visible true))

(defn- get-other-state [complete-state state]
  "Given a state, returns the other state in complete state."
  (let [state-1          (get-state complete-state :state-1)
        state-2          (get-state complete-state :state-2)
        state-id         (:state-id state)
        other-state      (if (= state-id :state-1) state-2 state-1)]
    other-state))

(defn go-toggle-split [complete-state state]
  "Toggles the split pane. If only 1 pane is currently visible, chanes the state of the other one to visible.
  If both panes are visible, changes the given state to not visible."
  (let [state-to-toggle    state
        other-state        (get-other-state complete-state state)
        is-split           (is-split complete-state)
        new-complete-state (if is-split
                             (assoc-in complete-state [:split-states (:state-id state-to-toggle)] (go-hide state-to-toggle))
                             (assoc (assoc-in complete-state [:split-states (:state-id other-state)] (go-show other-state))
                               :order [(:state-id state-to-toggle) (:state-id other-state)]))]
    new-complete-state))

(defn reset-complete-state [complete-state]
  "This shows state-1 and hides state-2"
  (let [state-1            (get-state complete-state :state-1)
        state-2            (get-state complete-state :state-2)
        new-complete-state (reduce #(assoc-in %1 (%2 0) (%2 1)) complete-state
                                   [[[:split-states :state-1] (go-home state-1)]
                                    [[:split-states :state-2] (go-hide state-2)]])]
    (assoc new-complete-state :order [:state-1 :state-2])))

(defn modify-complete-state [complete-state state fun]
  "Applies fun to state inside complete-state and returns the new complete state."
  (let [state-id           (:state-id state)
        new-state          (fun state)
        replace-state      (fn [complete-state state]
                             (assoc-in complete-state [:split-states state-id] new-state))
        new-complete-state (replace-state complete-state new-state)]
    new-complete-state))

(defn get-all-states [complete-state]
  "Returns a vector containing the states for the 2 panes."
  (let [split-states (:split-states complete-state)
        state-1      (get split-states :state-1)
        state-2      (get split-states :state-2)]
    [state-1 state-2]))
