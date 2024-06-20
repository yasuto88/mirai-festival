import { User } from "./types";

export const initialUserState: User = {
  student_id: 0,
  balance: 0,
  possession_list: [],
  isAdmin: false,
  allUsers: [], // allUsers プロパティを追加
  error: null,
};
