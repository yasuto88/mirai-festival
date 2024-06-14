import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../reducks/store";
import { signIn } from "../../../reducks/user";

export const useLogin = () => {
  const [studentNumber, setStudentNumber] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isPersistent, setIsPersistent] = useState(false);
  const dispatch: AppDispatch = useDispatch();

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(signIn(Number(studentNumber)));
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
