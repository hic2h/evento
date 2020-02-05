import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import EventDetails from "@core/events/entities/event-details";

@Component({
  selector: "app-event-details-card",
  templateUrl: "./event-details-card.component.html",
  styleUrls: ["./event-details-card.component.scss"]
})
export class EventDetailsCardComponent implements OnInit {
  @Input() event: EventDetails;
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  deleteEvent(eventId: string) {
    this.delete.emit(eventId);
  }
}
