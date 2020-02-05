import { NgModule } from "@angular/core";

import { EventsRoutingModule } from "./events-routing.module";
import { AllEventsComponent } from "./pages/all-events/all-events.component";
import { SharedModule } from "../../shared/shared.module";
import { CommonModule } from "@angular/common";
import { CreateEventPageComponent } from "./pages/create-event-page/create-event-page.component";
import { EventFormComponent } from "./components/event-form/event-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditEventPageComponent } from "./pages/edit-event-page/edit-event-page.component";
import { FeaturedEventsComponent } from "./components/featured-events/featured-events.component";
import { EventCardComponent } from "./components/event-card/event-card.component";
import { EventDetailsPageComponent } from "./pages/event-details-page/event-details-page.component";
import { EventDetailsCardComponent } from "./components/event-details-card/event-details-card.component";
import { SearchPageComponent } from "./pages/search-page/search-page.component";
import { Store } from "@ngrx/store";
import * as fromEvent from "@core/events/event.reducer";
import * as eventActions from "@core/events/event.actions";
import { Actions, ofType } from "@ngrx/effects";
import { Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { EventApi } from "@core/events/event.api";
import { Router } from "@angular/router";
import { NotificationService } from "../../shared/notification.service";

@NgModule({
  declarations: [
    AllEventsComponent,
    CreateEventPageComponent,
    EventFormComponent,
    EditEventPageComponent,
    FeaturedEventsComponent,
    EventCardComponent,
    EventDetailsPageComponent,
    EventDetailsCardComponent,
    SearchPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EventsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EventsModule {
  constructor(
    private store: Store<fromEvent.State>,
    private updates$: Actions,
    private router: Router,
    private notificationService: NotificationService
  ) {
    /**
     * Load all events when the module is loaded
     */
    this.store.dispatch(new eventActions.Load());

    /**
     * Listen to events when an Event is successfully created, updated or removed
     * to display a notification on top
     * and redirect to the events home page
     */
    updates$
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
    updates$
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
}
