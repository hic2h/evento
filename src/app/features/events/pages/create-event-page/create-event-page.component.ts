import { Component, OnInit } from "@angular/core";
import EventDetails from "@core/events/entities/event-details";
import { Store } from "@ngrx/store";
import * as fromEvent from "@core/events/event.reducer";
import * as actions from "@core/events/event.actions";

@Component({
  selector: "app-create-event-page",
  templateUrl: "./create-event-page.component.html",
  styleUrls: ["./create-event-page.component.scss"]
})
export class CreateEventPageComponent implements OnInit {
  constructor(private store: Store<fromEvent.EventState>) {}

  ngOnInit(): void {}

  onCreate(event: EventDetails) {
    this.store.dispatch(new actions.Add(event));
  }
}
