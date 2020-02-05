import { Action } from "@ngrx/store";
import EventDetails from "@core/events/entities/event-details";

export const LOAD = "[Event] Load Events";
export const LOAD_ONE = "[Event] Load Event by ID";
export const LOAD_SUCCESS = "[Event] Events loaded successfully";
export const LOAD_FAILED = "[Event] Events load failed";

export const ADD = "[Event] add Event";
export const ADD_SUCCESS = "[Event] Event added successfully";
export const ADD_FAILED = "[Event] Event add failed";

export const UPDATE = "[Event] update Event";
export const UPDATE_SUCCESS = "[Event] Event updated successfully";
export const UPDATE_FAILED = "[Event] Event update failed";

export const REMOVE = "[Event] delete Event";
export const REMOVE_SUCCESS = "[Event] Event removed successfully";
export const REMOVE_FAILED = "[Event] Event remove failed";

export class Load implements Action {
  readonly type = LOAD;
  constructor() {}
}
export class LoadOne implements Action {
  readonly type = LOAD_ONE;
  constructor(public id: string) {}
}
export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;
  constructor(public payload: EventDetails[]) {}
}

export class LoadFailed implements Action {
  readonly type = LOAD_FAILED;
  constructor(public payload: string) {}
}
export class Add implements Action {
  readonly type = ADD;
  constructor(public payload: EventDetails) {}
}
export class AddSuccess implements Action {
  readonly type = ADD_SUCCESS;
  constructor(public payload: EventDetails) {}
}
export class AddFailed implements Action {
  readonly type = ADD_FAILED;
  constructor(public payload: string) {}
}

export class Update implements Action {
  readonly type = UPDATE;
  constructor(public id: string, public payload: EventDetails) {}
}
export class UpdateSuccess implements Action {
  readonly type = UPDATE_SUCCESS;
  constructor(public id: string, public payload: EventDetails) {}
}
export class UpdateFailed implements Action {
  readonly type = UPDATE_FAILED;
  constructor(public payload: string) {}
}

export class Remove implements Action {
  readonly type = REMOVE;
  constructor(public id: string) {}
}
export class RemoveSuccess implements Action {
  readonly type = REMOVE_SUCCESS;
  constructor(public id: string) {}
}
export class RemoveFailed implements Action {
  readonly type = REMOVE_FAILED;
  constructor(public payload: string) {}
}

export type EventActions =
  | Load
  | LoadOne
  | LoadSuccess
  | LoadFailed
  | Add
  | AddSuccess
  | AddFailed
  | Update
  | UpdateSuccess
  | UpdateFailed
  | Remove
  | RemoveSuccess
  | RemoveFailed;
