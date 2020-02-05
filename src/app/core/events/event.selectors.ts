import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  featuredEvents,
  findEvent,
  pastEvents,
  searchEvents,
  upcomingEvents
} from "@core/events/event.utils";
import {
  eventAdapter,
  eventFeatureKey,
  State
} from "@core/events/event.reducer";

export const getEventState = createFeatureSelector<State>(eventFeatureKey);
export const { selectAll } = eventAdapter.getSelectors(getEventState);
export const selectFeaturedEvents = createSelector(selectAll, featuredEvents);
export const selectUpcomingEvents = createSelector(selectAll, upcomingEvents);
export const selectPastEvents = createSelector(selectAll, pastEvents);
export const selectEventById = createSelector(selectAll, findEvent);
export const selectEventsByFilter = createSelector(selectAll, searchEvents);
