import { Component, Input, OnInit } from "@angular/core";
import EventDetails from "@core/events/entities/event-details";

@Component({
  selector: "app-featured-events",
  templateUrl: "./featured-events.component.html",
  styleUrls: ["./featured-events.component.scss"]
})
export class FeaturedEventsComponent implements OnInit {
  @Input() featuredEvents: EventDetails[];
  constructor() {}

  ngOnInit(): void {}
}
