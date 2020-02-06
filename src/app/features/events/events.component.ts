import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromEvent from "@core/events/event.reducer";
import { Actions, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import { NotificationService } from "../../shared/notification.service";
import * as eventActions from "@core/events/event.actions";
import { tap } from "rxjs/operators";
import { Observable, Subscription } from "rxjs";
import EventDetails from "@core/events/entities/event-details";
import * as selectors from "@core/events/event.selectors";

@Component({
  selector: "app-events",
  template: `
    <nz-spin [nzSpinning]="loadingState$ | async">
      <router-outlet></router-outlet>
    </nz-spin>
  `
})
export class EventsComponent implements OnInit, OnDestroy {
  successNotifications: Subscription;
  errorNotifications: Subscription;
  loadingState$: Observable<boolean>;
  constructor(
    private store: Store<fromEvent.EventState>,
    private updates$: Actions,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    /**
     * Subscribe to the Events loading state.
     * Display a global spinner in loading state
     */
    this.loadingState$ = this.store.select(selectors.selectEventsLoading);
    /**
     * Load all events when the module is loaded
     */
    this.store.dispatch(new eventActions.Load());

    /**
     * Listen to events when an Event is successfully created, updated or removed
     * to display a notification on top
     * and redirect to the events home page
     */
    this.successNotifications = this.updates$
      .pipe(
        ofType(
          eventActions.ADD_SUCCESS,
          eventActions.UPDATE_SUCCESS,
          eventActions.REMOVE_SUCCESS
        ),
        tap(action => {
          let successMessage = "";
          const successType = (action as
            | eventActions.AddSuccess
            | eventActions.UpdateSuccess
            | eventActions.RemoveSuccess).type;

          switch (successType) {
            case eventActions.ADD_SUCCESS:
              successMessage = "The event is successfully added!";
              break;
            case eventActions.UPDATE_SUCCESS:
              successMessage = "The event is successfully updated!";
              break;
            case eventActions.REMOVE_SUCCESS:
              successMessage = "The event is successfully removed!";
              break;
          }
          this.notificationService.showSuccess(successMessage);
          this.router.navigate(["/events"]);
        })
      )
      .subscribe();

    /**
     * Listen to events when an requests failed and display an error notification
     */
    this.errorNotifications = this.updates$
      .pipe(
        ofType(
          eventActions.LOAD_FAILED,
          eventActions.ADD_FAILED,
          eventActions.UPDATE_FAILED,
          eventActions.REMOVE_FAILED
        ),
        tap(action => {
          const errorMessage = (action as
            | eventActions.LoadFailed
            | eventActions.AddFailed
            | eventActions.UpdateFailed
            | eventActions.RemoveFailed).payload;

          this.notificationService.showError(errorMessage);
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.successNotifications.unsubscribe();
    this.errorNotifications.unsubscribe();
  }
}
