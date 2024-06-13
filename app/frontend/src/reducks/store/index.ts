import { configureStore } from "@reduxjs/toolkit";
import { prefecturesReducer } from "../user";

const store = configureStore({
  reducer: {
    user: prefecturesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
