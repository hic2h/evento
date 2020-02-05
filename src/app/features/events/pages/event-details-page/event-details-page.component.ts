import { AfterContentInit, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap } from "rxjs/operators";
import { Observable } from "rxjs";
import EventDetails from "@core/events/entities/event-details";
import { Store } from "@ngrx/store";
import * as fromEvent from "@core/events/event.reducer";
import * as selectors from "@core/events/event.selectors";
import * as actions from "@core/events/event.actions";

@Component({
  selector: "app-event-details-page",
  templateUrl: "./event-details-page.component.html",
  styleUrls: ["./event-details-page.component.scss"]
})
export class EventDetailsPageComponent implements AfterContentInit {
  eventDetails$: Observable<EventDetails>;
  constructor(
    private route: ActivatedRoute,
    private store: Store<fromEvent.State>
  ) {}

  ngAfterContentInit() {
    this.eventDetails$ = this.route.paramMap.pipe(
      map(params => params.get("eventId")),
      switchMap(eventId =>
        this.store.select(selectors.selectEventById, { eventId })
      )
    );
  }

  onDeleteEvent(eventId: string) {
    this.store.dispatch(new actions.Remove(eventId));
  }
}
