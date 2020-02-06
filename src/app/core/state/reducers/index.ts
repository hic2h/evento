import { ActionReducerMap } from "@ngrx/store";
import * as fromEvent from "../../events/event.reducer";

export interface AppState {
  [fromEvent.eventFeatureKey]: fromEvent.EventState;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromEvent.eventFeatureKey]: fromEvent.reducer
};
