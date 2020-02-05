import { Injectable } from "@angular/core";
import { HttpService } from "../http.service";
import { Observable } from "rxjs";
import EventDetails from "./entities/event-details";
const COLLECTION_NAME = "events";
@Injectable({
  providedIn: "root"
})
export class EventApi {
  constructor(public http: HttpService) {}

  /**
   * Returns a list of all the events from the database.
   */
  getAllEvents(): Observable<EventDetails[]> {
    return this.http.getAll<EventDetails>(COLLECTION_NAME);
  }

  /**
   * Create and persist a new event in database.
   */
  addEvent(event: EventDetails) {
    return this.http.add<EventDetails>(COLLECTION_NAME, event);
  }

  /**
   * Update the details of an existing event.
   */
  updateEvent(eventId: string, event: EventDetails) {
    return this.http.update<EventDetails>(COLLECTION_NAME, eventId, event);
  }
  /**
   * Delete the event from database
   */
  deleteEvent(eventId: string) {
    return this.http.delete<EventDetails>(COLLECTION_NAME, eventId);
  }

  /**
   * Returns details for an event by the ID.
   */
  getEventById(eventId: string): Observable<EventDetails> {
    return this.http.getOne<EventDetails>(COLLECTION_NAME, eventId);
  }
}
