import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./types";
import { initialFetchUserState } from "./initializes";

const userSlice = createSlice({
  name: "user",
  initialState: initialFetchUserState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserBalance(state, action: PayloadAction<number>) {
      if (state.user) {
        state.user.balance = action.payload;
      }
    },
    setAdminStatus(state, action: PayloadAction<boolean>) {
      if (state.user) {
        state.user.is_admin = action.payload;
      }
    },
    updateUserItems(state, action: PayloadAction<User["items"]>) {
      if (state.user) {
        state.user.items = action.payload;
      }
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setUser,
  updateUserBalance,
  setAdminStatus,
  updateUserItems,
  setLoading,
  setError,
} = userSlice.actions;
export default userSlice.reducer;
