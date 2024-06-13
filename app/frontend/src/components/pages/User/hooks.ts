import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { RootState } from "../../../reducks/store";
import { loadUser } from "../../../reducks/user";

export const useUserPage = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => loadUser(state));

  useEffect(() => {
    if (!user.student_id) {
      router.push("/login");
    }
  }, [user.student_id, router]);

  return user;
};
