import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer, { setUser } from "../user/slices";
import eventReducer from "../event/slices";
import betReducer from "../bet/slices";
import productReducer from "../product/slices";
import { User } from "../user/types";

// ストアを生成
const store = configureStore({
  reducer: {
    user: userReducer,
    events: eventReducer,
    bets: betReducer,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {},
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
