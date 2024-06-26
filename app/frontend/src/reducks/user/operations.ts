import {
  signInAction,
  addItemAction,
  fetchUserAction,
  fetchProductAction,
  fetchAllUsersAction,
  fetchAllItemsAction,
  setErrorAction,
} from "./slices";
import type { User, Item } from "./types";
import { AppDispatch } from "../store";

/**
 * サインイン処理
 */
export function signIn(student_id: number) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(
      `https://${process.env.API_URL}/api/users/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student_id }),
      }
    );
    const data: User = await response.json();
    if (response.ok) {
      localStorage.setItem("student_id", student_id.toString()); // ローカルストレージに学籍番号を保存
      dispatch(signInAction(data));
    } else {
      dispatch(setErrorAction("User login failed"));
    }
  };
}

/**
 * ユーザー情報取得処理
 */
export function fetchUser(student_id: number) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(
      `https://${process.env.API_URL}/api/users/${student_id}`
    );
    const data: User = await response.json();
    if (response.ok) {
      dispatch(fetchUserAction(data));
    } else {
      dispatch(setErrorAction("Fetch user failed"));
    }
  };
}

/**
 * 管理者ログイン処理
 */
export function loginAdmin(admin_id: string, password: string) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(
      `https://${process.env.API_URL}/api/admins/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admin_id, password }),
      }
    );
    const data: User = await response.json();
    if (response.ok) {
      localStorage.setItem("student_id", admin_id); // ローカルストレージに学籍番号を保存
      dispatch(signInAction(data));
    } else {
      dispatch(setErrorAction("Admin login failed"));
    }
  };
}

/**
 * ユーザー情報更新処理
 */
export function updateUser(student_id: number, user: User) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(
      `https://${process.env.API_URL}/api/users/${student_id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      }
    );
    if (response.ok) {
      dispatch(signInAction(user));
    } else {
      dispatch(setErrorAction("Update user failed"));
    }
  };
}

/**
 * アイテム追加処理
 */
export function addItem(
  student_id: number,
  product_id: number,
  quantity: number
) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(
      `https://${process.env.API_URL}/api/add-product`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student_id, product_id, quantity }),
      }
    );
    const data: User = await response.json();
    if (response.ok) {
      dispatch(addItemAction(data));
    } else {
      const errorData = await response.json();
      dispatch(setErrorAction(errorData.error || "Add item failed"));
    }
  };
}

/**
 * アイテム情報更新処理
 */
export function updateItem(product_id: number, item: Item) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(
      `https://${process.env.API_URL}/api/products/${product_id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      }
    );
    if (response.ok) {
      dispatch(fetchProductAction(item));
    } else {
      dispatch(setErrorAction("Update item failed"));
    }
  };
}

/**
 * アイテム削除処理
 */
export function deleteItem(product_id: number) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(
      `https://${process.env.API_URL}/api/products/${product_id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      dispatch(fetchAllItems());
    } else {
      dispatch(setErrorAction("Delete item failed"));
    }
  };
}

/**
 * プロダクト情報取得処理
 */
export function fetchProduct(product_id: number) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(
      `https://${process.env.API_URL}/api/products/${product_id}`
    );
    const data: Item = await response.json();
    if (response.ok) {
      dispatch(fetchProductAction(data)); // 商品情報を設定するアクションをディスパッチ
      return data; // 商品情報を返す
    } else {
      dispatch(setErrorAction("Fetch product failed"));
    }
  };
}

/**
 * 全ユーザー情報取得処理
 */
export function fetchAllUsers() {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(`https://${process.env.API_URL}/api/users`);
    const data: User[] = await response.json();
    if (response.ok) {
      dispatch(fetchAllUsersAction(data));
    } else {
      dispatch(setErrorAction("Fetch all users failed"));
    }
  };
}

/**
 * 全アイテム情報取得処理
 */
export function fetchAllItems() {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(`https://${process.env.API_URL}/api/items`);
    const data: Item[] = await response.json();
    if (response.ok) {
      dispatch(fetchAllItemsAction(data));
    } else {
      dispatch(setErrorAction("Fetch all items failed"));
    }
  };
}

/**
 * 新しいアイテム追加処理
 */
export function addNewItem(item: Item) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(
      `https://${process.env.API_URL}/api/products`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      }
    );
    const data: Item = await response.json();
    if (response.ok) {
      dispatch(fetchAllItems());
    } else {
      dispatch(setErrorAction("Add new item failed"));
    }
  };
}
