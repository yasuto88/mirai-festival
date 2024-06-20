import { configureStore } from "@reduxjs/toolkit";
import { initialUserState, userReducer } from "../user";

const preloadedState = () => {
  if (typeof window !== "undefined") {
    // クライアントサイドでのみlocalStorageを参照
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      return {
        user: JSON.parse(storedUser),
      };
    }
  }
  return {
    user: initialUserState,
  };
};

const store = configureStore({
  reducer: {
    user: userReducer.user,
    product: userReducer.product,
  },
  preloadedState: preloadedState(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
