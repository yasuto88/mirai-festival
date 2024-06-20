import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { signIn, loginAdmin } from "../../../reducks/user/operations";
import { AppDispatch } from "../../../reducks/store";

export const useLogin = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const [studentNumber, setStudentNumber] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isPersistent, setIsPersistent] = useState(false);

  const handleChangeStudentNumber = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStudentNumber(event.target.value);
  };

  const handleChangeAdminPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAdminPassword(event.target.value);
  };

  const handleChangeIsPersistent = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsPersistent(event.target.checked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPersistent) {
      await dispatch(loginAdmin(studentNumber, adminPassword));
      router.push("/admin");
    } else {
      await dispatch(signIn(Number(studentNumber)));
      router.push("/");
    }
  };

  return {
    studentNumber,
    adminPassword,
    isPersistent,
    handleChangeStudentNumber,
    handleChangeAdminPassword,
    handleChangeIsPersistent,
    handleSubmit,
  };
};
