import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { RootState } from "../../../reducks/store";
import { loadUser } from "../../../reducks/user";

export const useUserPage = () => {
  const user = useSelector((state: RootState) => loadUser(state));

  return user;
};
