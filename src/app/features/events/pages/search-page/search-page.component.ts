import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Observable } from "rxjs";
import EventDetails from "@core/events/entities/event-details";
import { Store } from "@ngrx/store";
import * as fromEvent from "@core/events/event.reducer";
import * as selectors from "@core/events/event.selectors";
import * as actions from "@core/events/event.actions";

@Component({
  selector: "app-search-page",
  templateUrl: "./search-page.component.html",
  styleUrls: ["./search-page.component.scss"]
})
export class SearchPageComponent implements OnInit {
  events$: Observable<EventDetails[]>;
  constructor(
    private route: ActivatedRoute,
    private store: Store<fromEvent.EventState>
  ) {}

  ngOnInit() {
    this.store.dispatch(new actions.Load());
    this.events$ = this.route.queryParams.pipe(
      switchMap(params =>
        this.store.select(selectors.selectEventsByFilter, params)
      )
    );
  }
}
