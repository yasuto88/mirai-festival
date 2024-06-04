import { createSelector } from "reselect";
import { RootState } from "../store";

const userSelector = (state: RootState) => state.user;

export const loadUserId = createSelector(
  [userSelector],
  (userState) => userState.user?.student_id
);

export const loadUserBalance = createSelector(
  [userSelector],
  (userState) => userState.user?.balance
);

export const isAdmin = createSelector(
  [userSelector],
  (userState) => userState.user?.is_admin
);

export const loadUserItems = createSelector(
  [userSelector],
  (userState) => userState.user?.items
);

export const isLoading = createSelector(
  [userSelector],
  (userState) => userState.loading
);

export const getError = createSelector(
  [userSelector],
  (userState) => userState.error
);
