import { createSelector } from "reselect";
import { RootState } from "../store";

const betSelector = (state: RootState) => state.bets;

export const loadBets = createSelector([betSelector], (bets) => bets);

export const loadBetById = (betId: number) =>
  createSelector([betSelector], (bets) =>
    bets.find((bet) => bet.bet_id === betId)
  );
