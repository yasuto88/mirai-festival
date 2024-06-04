import { Choice, Event, Events } from "./types";

export const initialEventsChoiceState: Choice = {
  choice_id: 0,
  name: "",
  odds: 0,
};

export const initialEventState: Event = {
  event_id: 0,
  title: "",
  details: "",
  start_time: "",
  end_time: "",
  result: null,
  choices: [initialEventsChoiceState],
};

export const initialEventsState: Events = {
  events: [initialEventState],
};
