import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Event } from "./types";

const initialEventState: Event[] = [];

const eventSlice = createSlice({
  name: "event",
  initialState: initialEventState,
  reducers: {
    setEvents(state, action: PayloadAction<Event[]>) {
      return action.payload;
    },
    addEvent(state, action: PayloadAction<Event>) {
      state.push(action.payload);
    },
    updateEvent(state, action: PayloadAction<Event>) {
      const index = state.findIndex(
        (event) => event.event_id === action.payload.event_id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { setEvents, addEvent, updateEvent } = eventSlice.actions;
export default eventSlice.reducer;
