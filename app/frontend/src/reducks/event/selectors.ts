import { createSelector } from "reselect";
import { RootState } from "../store";

const eventSelector = (state: RootState) => state.events;

export const loadEvents = createSelector([eventSelector], (events) => events);

export const loadEventById = (eventId: number) =>
  createSelector([eventSelector], (events) =>
    events.find((event) => event.event_id === eventId)
  );
