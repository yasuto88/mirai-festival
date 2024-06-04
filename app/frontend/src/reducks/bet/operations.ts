import { Action } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { setBets, addBet, updateBetResult, closeBet } from "./slices";
import { Bet } from "./types";

export const fetchBets = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      // データベースから賭けを取得するコードを追加してください
      const bets: Bet[] = []; // 仮のデータ

      dispatch(setBets(bets));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };
};

export const createBet = (bet: Bet) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      // データベースに賭けを保存するコードを追加してください
      dispatch(addBet(bet));
      // ユーザーの残高を減らす
      // dispatch(updateUserBalance(userBalance - bet.amount));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };
};

export const resolveBet = (betId: number, result: "win" | "lose" | "draw") => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      // データベースの賭け結果を更新するコードを追加してください
      dispatch(updateBetResult({ betId, result }));
      // 賭けの結果に応じてユーザーの残高を更新
      // dispatch(updateUserBalance(userBalance + winnings));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };
};

export const finalizeBet = (betId: number) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      // データベースの賭けを締め切るコードを追加してください
      dispatch(closeBet(betId));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };
};
