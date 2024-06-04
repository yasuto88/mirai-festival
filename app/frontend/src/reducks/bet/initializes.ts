import { Bet } from "./types";

export const initialBetState: Bet = {
  bet_id: 0,
  event_id: 0,
  choice: "",
  amount: 0,
  student_id: 0,
  status: "open",
  result: "pending",
};
