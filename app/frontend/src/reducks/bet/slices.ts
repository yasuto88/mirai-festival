import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bet } from "./types";

const initialBetState: Bet[] = [];

const betSlice = createSlice({
  name: "bet",
  initialState: initialBetState,
  reducers: {
    setBets(state, action: PayloadAction<Bet[]>) {
      return action.payload;
    },
    addBet(state, action: PayloadAction<Bet>) {
      state.push(action.payload);
    },
    updateBetResult(
      state,
      action: PayloadAction<{ betId: number; result: "win" | "lose" | "draw" }>
    ) {
      const index = state.findIndex(
        (bet) => bet.bet_id === action.payload.betId
      );
      if (index !== -1) {
        state[index].result = action.payload.result;
        state[index].status = "resolved";
      }
    },
    closeBet(state, action: PayloadAction<number>) {
      const index = state.findIndex((bet) => bet.bet_id === action.payload);
      if (index !== -1) {
        state[index].status = "closed";
      }
    },
  },
});

export const { setBets, addBet, updateBetResult, closeBet } = betSlice.actions;
export default betSlice.reducer;
