import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../reducks/store";
import { useRouter } from "next/router";
import { useCallback } from "react";

export const useUserProfile = () => {
  const studentId = useSelector(
    (state: RootState) => state.user?.student_id ?? null
  );
  const balance = useSelector((state: RootState) => state.user?.balance ?? 0);

  // const router = useRouter();

  // const handleLogout = useCallback(() => {
  //   localStorage.removeItem("student_id");
  //   // ページをリロードする
  //   router.reload();
  // }, [router]);

  return {
    studentId,
    balance,
    // handleLogout,
  };
};
