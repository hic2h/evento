import { Component, OnInit } from "@angular/core";
import EventDetails from "@core/events/entities/event-details";
import { EventTime } from "@core/events/entities/search-query";
import { Store } from "@ngrx/store";
import * as selectors from "@core/events/event.selectors";
import * as fromEvent from "@core/events/event.reducer";
import { Observable } from "rxjs";

@Component({
  selector: "app-all-events",
  templateUrl: "./all-events.component.html",
  styleUrls: ["./all-events.component.scss"]
})
export class AllEventsComponent implements OnInit {
  eventsPerPage = 6;
  featuredEvents$: Observable<EventDetails[]>;
  upcomingEvents$: Observable<EventDetails[]>;
  pastEvents$: Observable<EventDetails[]>;
  public eventTime = EventTime;
  constructor(private store: Store<fromEvent.State>) {}

  ngOnInit() {
    this.featuredEvents$ = this.store.select(selectors.selectFeaturedEvents);
    this.upcomingEvents$ = this.store.select(selectors.selectUpcomingEvents);
    this.pastEvents$ = this.store.select(selectors.selectPastEvents);
  }
}
