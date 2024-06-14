import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User, Item } from "./types";
import { initialUserState } from "./initialState";

/**
 * ユーザー情報のスライス
 */
const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    signInAction: (state: User, action: PayloadAction<User>) => {
      return { ...state, ...action.payload };
    },
    addItemAction: (state: User, action: PayloadAction<User>) => {
      return { ...state, ...action.payload };
    },
    updateBalanceAction: (state: User, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    fetchUserAction: (state: User, action: PayloadAction<User>) => {
      return { ...state, ...action.payload };
    },
    setErrorAction: (state: User, action: PayloadAction<string>) => {
      return { ...state, error: action.payload };
    },
  },
});

const productSlice = createSlice({
  name: "product",
  initialState: null as Item | null,
  reducers: {
    fetchProductAction: (state, action: PayloadAction<Item>) => {
      return action.payload;
    },
  },
});

// actionをエクスポート
export const {
  signInAction,
  addItemAction,
  updateBalanceAction,
  fetchUserAction,
  setErrorAction,
} = userSlice.actions;

export const { fetchProductAction } = productSlice.actions;

// reducerをエクスポート
// export default { user: userSlice.reducer, product: productSlice.reducer };
const userReducer = {
  user: userSlice.reducer,
  product: productSlice.reducer,
};
export default userReducer;
