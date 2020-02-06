import EventDetails from "@core/events/entities/event-details";
import { createEntityAdapter, EntityState } from "@ngrx/entity";
import * as actions from "./event.actions";

export const eventFeatureKey = "event";

// Event adapter
export const eventAdapter = createEntityAdapter<EventDetails>();
export interface EventState extends EntityState<EventDetails> {
  loading: boolean;
}

// Event Initial State
export const initialState: EventState = eventAdapter.getInitialState({
  loading: false
});

// Event Reducer
export function reducer(
  state: EventState = initialState,
  action: actions.EventActions
) {
  switch (action.type) {
    case actions.LOAD:
      return { ...state, loading: true };
    case actions.LOAD_SUCCESS:
      return eventAdapter.addAll(action.payload, { ...state, loading: false });
    case actions.ADD:
      return { ...state, loading: true };
    case actions.ADD_SUCCESS:
      return eventAdapter.addOne(action.payload, { ...state, loading: false });
    case actions.UPDATE:
      return { ...state, loading: true };
    case actions.UPDATE_SUCCESS:
      return eventAdapter.updateOne(
        {
          id: action.id,
          changes: action.payload
        },
        { ...state, loading: false }
      );
    case actions.REMOVE:
      return { ...state, loading: true };
    case actions.REMOVE_SUCCESS:
      return eventAdapter.removeOne(action.id, { ...state, loading: false });
    default:
      return { ...state, loading: false };
  }
}
