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
    signInAction: (state, action: PayloadAction<User>) => {
      return { ...state, ...action.payload };
    },
    addItemAction: (state, action: PayloadAction<User>) => {
      return { ...state, ...action.payload };
    },
    updateBalanceAction: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    fetchUserAction: (state, action: PayloadAction<User>) => {
      return { ...state, ...action.payload };
    },
    fetchAllUsersAction: (state, action: PayloadAction<User[]>) => {
      return { ...state, allUsers: action.payload };
    },
    setErrorAction: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    currentProduct: null as Item | null,
    allItems: [] as Item[],
  },
  reducers: {
    fetchProductAction: (state, action: PayloadAction<Item>) => {
      state.currentProduct = action.payload;
    },
    fetchAllItemsAction: (state, action: PayloadAction<Item[]>) => {
      state.allItems = action.payload;
    },
  },
});

// actionをエクスポート
export const {
  signInAction,
  addItemAction,
  updateBalanceAction,
  fetchUserAction,
  fetchAllUsersAction,
  setErrorAction,
} = userSlice.actions;

export const { fetchProductAction, fetchAllItemsAction } = productSlice.actions;

// reducerをエクスポート
const rootReducer = {
  user: userSlice.reducer,
  product: productSlice.reducer,
};
export default rootReducer;
