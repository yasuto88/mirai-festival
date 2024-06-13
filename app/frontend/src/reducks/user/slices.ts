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
      const updatedData = { ...state, ...action.payload };
      return updatedData;
    },
    addItemAction: (state: User, action: PayloadAction<Item>) => {
      const item = action.payload;
      const existingItem = state.possession_list.find(
        (i) => i.product_id === item.product_id
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.possession_list.push(item);
      }
    },
    updateBalanceAction: (state: User, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
  },
});

// actionをエクスポート
export const { signInAction, addItemAction, updateBalanceAction } =
  userSlice.actions;

// reducerをエクスポート
export default userSlice.reducer;
