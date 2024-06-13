import { Dispatch } from "react";
import { signInAction, addItemAction, updateBalanceAction } from "./slices";
import type { User, Item } from "./types";

/**
 * サインイン処理
 */
export function signIn(student_id: string) {
  return async (dispatch: Dispatch<any>) => {
    const response = await fetch(`/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ student_id }),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(signInAction(data));
    } else {
      console.error("User login failed");
    }
  };
}

/**
 * 管理者ログイン処理
 */
export function loginAdmin(admin_id: string, password: string) {
  return async (dispatch: Dispatch<any>) => {
    const response = await fetch(`/api/admins/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ admin_id, password }),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(signInAction(data));
    } else {
      console.error("Admin login failed");
    }
  };
}

/**
 * ユーザー情報取得処理
 */
export function fetchUser(student_id: string) {
  return async (dispatch: Dispatch<any>) => {
    const response = await fetch(`/api/users/${student_id}`);
    const data = await response.json();
    if (response.ok) {
      dispatch(signInAction(data));
    } else {
      console.error("Fetch user failed");
    }
  };
}

/**
 * ユーザー情報更新処理
 */
export function updateUser(student_id: string, user: User) {
  return async (dispatch: Dispatch<any>) => {
    const response = await fetch(`/api/users/${student_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      dispatch(signInAction(user));
    } else {
      console.error("Update user failed");
    }
  };
}

/**
 * アイテム追加処理
 */
export function addItem(item: Item) {
  return (dispatch: Dispatch<any>) => {
    dispatch(addItemAction(item));
  };
}

/**
 * バランス更新処理
 */
export function updateBalance(balance: number) {
  return (dispatch: Dispatch<any>) => {
    dispatch(updateBalanceAction(balance));
  };
}
