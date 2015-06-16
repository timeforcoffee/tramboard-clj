(ns tramboard-clj.script.state
  "This namespace deals with state functions and manipulations. The complete state of the app is the
  state of both split panes. Each pane's state is represented by a state structure contained in
  a map with 2 named items, like this :
  :split-states {:state-1 {:state-id :state-1 :state :home :params {} :visible true}
  :state-2 {:state-id :state-2 :state :home :params {} :visible false}}
  :order [:state-1 :state-2]}
  When referring to complete state, one means the whole structure above. When referring to state, one
  means one of the 2 states inside the complete state.")

(defn is-home [state]
  (= :home (:state state)))

(defn go-home [state]
  (assoc state :state :home :params {}))

(defn go-edit [state view-id]
  (assoc state :state :edit :params {:view-id view-id}))

(defn- go-hide [state]
  (go-home (assoc state :visible false)))

(defn- go-show [state]
  (assoc state :visible true))

; DEPRECATED the complete state does not exist any more
(defn get-state [complete-state state-id]
  "Returns the state for the given state id"
  (get (:split-states complete-state) state-id))
