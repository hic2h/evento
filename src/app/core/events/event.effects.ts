import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import * as eventActions from "./event.actions";
import { Action } from "@ngrx/store";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { EventApi } from "@core/events/event.api";

@Injectable()
export class EventEffects {
  constructor(private actions$: Actions, private eventApi: EventApi) {}

  @Effect()
  loadAllEvents$: Observable<Action> = this.actions$.pipe(
    ofType(eventActions.LOAD),
    switchMap(action =>
      this.eventApi
        .getAllEvents()
        .pipe(map(events => new eventActions.LoadSuccess(events)))
    ),
    catchError(error => of(new eventActions.LoadFailed(error.message)))
  );

  @Effect()
  loadOneEvent$: Observable<Action> = this.actions$.pipe(
    ofType<eventActions.LoadOne>(eventActions.LOAD_ONE),
    switchMap(action =>
      this.eventApi
        .getEventById(action.id)
        .pipe(map(event => new eventActions.LoadSuccess([event])))
    ),
    catchError(error => of(new eventActions.LoadFailed(error.message)))
  );

  @Effect()
  addEvent$: Observable<Action> = this.actions$.pipe(
    ofType<eventActions.Add>(eventActions.ADD),
    switchMap(action =>
      this.eventApi
        .addEvent(action.payload)
        .pipe(map(event => new eventActions.AddSuccess(action.payload)))
    ),
    catchError(error => of(new eventActions.AddFailed(error.message)))
  );

  @Effect()
  updateEvent$: Observable<Action> = this.actions$.pipe(
    ofType<eventActions.Update>(eventActions.UPDATE),
    switchMap(action =>
      this.eventApi
        .updateEvent(action.id, action.payload)
        .pipe(
          map(() => new eventActions.UpdateSuccess(action.id, action.payload))
        )
    ),
    catchError(error => of(new eventActions.UpdateFailed(error.message)))
  );

  @Effect()
  removeEvent$: Observable<Action> = this.actions$.pipe(
    ofType<eventActions.Remove>(eventActions.REMOVE),
    switchMap(action =>
      this.eventApi
        .deleteEvent(action.id)
        .pipe(map(event => new eventActions.RemoveSuccess(action.id)))
    ),
    catchError(error => of(new eventActions.RemoveFailed(error.message)))
  );
}
