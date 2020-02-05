import EventDetails from "@core/events/entities/event-details";
import { createEntityAdapter, EntityState } from "@ngrx/entity";
import * as actions from "./event.actions";

export const eventFeatureKey = "event";

// Event adapter
export const eventAdapter = createEntityAdapter<EventDetails>();
export interface State extends EntityState<EventDetails> {}

// Event Initial State
export const initialState: State = eventAdapter.getInitialState();

// Event Reducer
export function reducer(
  state: State = initialState,
  action: actions.EventActions
) {
  switch (action.type) {
    case actions.LOAD_SUCCESS:
      return eventAdapter.addAll(action.payload, state);
    case actions.ADD_SUCCESS:
      return eventAdapter.addOne(action.payload, state);
    case actions.UPDATE_SUCCESS:
      return eventAdapter.updateOne(
        {
          id: action.id,
          changes: action.payload
        },
        state
      );
    case actions.REMOVE_SUCCESS:
      return eventAdapter.removeOne(action.id, state);
    default:
      return state;
  }
}
