import { Component, Input, OnInit } from "@angular/core";
import EventDetails from "@core/events/entities/event-details";

@Component({
  selector: "app-event-card",
  templateUrl: "./event-card.component.html",
  styleUrls: ["./event-card.component.scss"]
})
export class EventCardComponent implements OnInit {
  @Input() event: EventDetails;
  constructor() {}

  ngOnInit(): void {}
}
