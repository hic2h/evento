import EventDetails from "@core/events/entities/event-details";
import { EventTime, SearchQuery } from "@core/events/entities/search-query";

export function parseDate(events: EventDetails[]) {
  return events.map(event => {
    event.period.startDate = new Date(event.period.startDate);
    event.period.endDate = new Date(event.period.endDate);
    return event;
  });
}
export function featuredEvents(events: EventDetails[]) {
  return events.filter(event => event.featured);
}
export function upcomingEvents(events: EventDetails[]) {
  return parseDate(events)
    .filter(event => event.period.endDate >= new Date())
    .sort((event1, event2) => {
      const startDate1 = event1.period.startDate;
      const startDate2 = event2.period.startDate;
      return startDate1 < startDate2 ? -1 : startDate1 > startDate2 ? 1 : 0;
    });
}
export function pastEvents(events: EventDetails[]) {
  return parseDate(events)
    .filter(event => event.period.endDate <= new Date())
    .sort((event1, event2) => {
      const startDate1 = event1.period.startDate;
      const startDate2 = event2.period.startDate;
      return startDate1 > startDate2 ? -1 : startDate1 < startDate2 ? 1 : 0;
    });
}

export function findEvent(events: EventDetails[], props) {
  const { eventId } = props;
  const filteredEvents = events.filter(event => event.id === eventId);
  return filteredEvents.length ? filteredEvents[0] : null;
}

export function searchEvents(events: EventDetails[], query: SearchQuery) {
  if (query.eventTime === EventTime.Past) {
    return pastEvents(events);
  } else if (query.eventTime === EventTime.Upcoming) {
    return upcomingEvents(events);
  } else {
    throw Error(`${query.eventTime} is not a type of EventTime`);
  }
}
