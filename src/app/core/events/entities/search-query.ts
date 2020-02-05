export enum EventTime {
  Upcoming = "upcoming",
  Past = "past"
}

export interface SearchQuery {
  eventTime: EventTime;
}
