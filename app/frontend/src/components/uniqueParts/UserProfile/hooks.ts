import { useSelector } from "react-redux";
import { RootState } from "../../../reducks/store";

export const useUserProfile = () => {
  const studentId = useSelector(
    (state: RootState) => state.user?.student_id ?? null
  );
  const balance = useSelector(
    (state: RootState) => state.user?.balance ?? 0
  );

  return {
    studentId,
    balance,
  };
};
