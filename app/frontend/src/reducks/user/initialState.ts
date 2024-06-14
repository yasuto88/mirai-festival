import { User } from "./types";

/**
 * ユーザー情報の初期化
 */
export const initialUserState: User = {
  student_id: 0,
  balance: 0,
  possession_list: [],
  isAdmin: false,
};
