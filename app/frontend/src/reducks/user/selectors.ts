import { createSelector } from "reselect";
import { RootState } from "../store";

const userSelector = (state: RootState) => state.user;

/** ユーザー情報の取得 */
export const loadUser = createSelector([userSelector], (user) => user);

/** ユーザーバランスの取得 */
export const loadUserBalance = createSelector(
  [userSelector],
  (state) => state.balance
);

/** ユーザー所持アイテムリストの取得 */
export const loadUserItems = createSelector(
  [userSelector],
  (state) => state.possession_list
);

/** 管理者かどうかの状態を取得 */
export const loadIsAdmin = createSelector(
  [userSelector],
  (state) => state.isAdmin
);
