import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap } from "rxjs/operators";
import { Observable } from "rxjs";
import EventDetails from "@core/events/entities/event-details";
import { Store } from "@ngrx/store";
import * as fromEvent from "@core/events/event.reducer";
import * as selectors from "@core/events/event.selectors";
import * as actions from "@core/events/event.actions";

@Component({
  selector: "app-edit-event-page",
  templateUrl: "./edit-event-page.component.html",
  styleUrls: ["./edit-event-page.component.scss"]
})
export class EditEventPageComponent implements OnInit {
  event$: Observable<EventDetails>;
  eventId: string;
  constructor(
    private route: ActivatedRoute,
    private store: Store<fromEvent.State>
  ) {}

  ngOnInit() {
    this.event$ = this.route.paramMap.pipe(
      map(params => {
        this.eventId = params.get("eventId");
        return this.eventId;
      }),
      switchMap(eventId =>
        this.store.select(selectors.selectEventById, { eventId })
      )
    );
  }

  onUpdate(event: EventDetails) {
    this.store.dispatch(new actions.Update(this.eventId, event));
  }
}
