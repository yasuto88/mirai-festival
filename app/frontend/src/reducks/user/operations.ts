import { Action, ThunkAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import {
  setUser,
  updateUserBalance,
  setAdminStatus,
  updateUserItems,
  setLoading,
  setError,
} from "./slices";
import { User, Item } from "./types";
import { RootState } from "../store";

// ユーザーログイン
export const signIn = (
  student_id: number,
  is_admin: boolean
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(setLoading(true));
    const userData: User = { student_id, balance: 0, is_admin, items: [] };
    try {
      const userData: User = {
        student_id,
        balance: 0,
        is_admin,
        items: [
          { item_id: 1, name: "勇者の剣", quantity: 1 },
          { item_id: 2, name: "魔法の杖", quantity: 2 },
        ],
      };
      localStorage.setItem("user", JSON.stringify(userData.student_id));
      dispatch(setUser(userData));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const signOut = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => {
  return (dispatch: Dispatch<Action>) => {
    dispatch(setLoading(true));
    try {
      localStorage.removeItem("user");
      dispatch(
        setUser({ student_id: null, balance: 0, is_admin: false, items: null })
      );
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
};
// ユーザーログアウト
// export const signOut = () => {
//   return async (dispatch: Dispatch<Action>) => {
//     try {
//       // ログアウト処理を追加してください
//       localStorage.removeItem("user");
//       dispatch(
//         setUser({ student_id: null, balance: 0, is_admin: false, items: null })
//       );
//     } catch (error) {
//       if (error instanceof Error) {
//         throw new Error(error.message);
//       }
//     }
//   };
// };

// 管理者認証
export const authenticateAdmin = (student_id: number, password: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      // 管理者認証のコードを追加してください
      const isAdmin = true; // 仮のデータ

      dispatch(setAdminStatus(isAdmin));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };
};

// 残高の更新
export const updateBalance = (newBalance: number) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(updateUserBalance(newBalance));
  };
};

// ユーザー情報の更新
export const updateUser = (
  student_id: number,
  balance: number,
  is_admin: boolean,
  items: Item[] | null
) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const userData: User = { student_id, balance, is_admin, items };
      // ユーザー情報をデータベースに更新するコードを追加してください
      dispatch(setUser(userData));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };
};

// ユーザーアイテムの更新
export const updateItems = (items: Item[]) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(updateUserItems(items));
  };
};
