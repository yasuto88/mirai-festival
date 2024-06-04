import { useSelector } from "react-redux";
import { RootState } from "../../../reducks/store";

export const useUserProfile = () => {
  const studentId = useSelector(
    (state: RootState) => state.user.user?.student_id ?? null
  );
  const balance = useSelector(
    (state: RootState) => state.user.user?.balance ?? 0
  );

  return {
    studentId,
    balance,
  };
};
