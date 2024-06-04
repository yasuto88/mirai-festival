import React from "react";
import { useLogin } from "./hooks";
import LoginPresenter from "./presenter";

const LoginContainer: React.FC = () => {
  const {
    studentNumber,
    adminPassword,
    isPersistent,
    handleChangeStudentNumber,
    handleChangeAdminPassword,
    handleChangeIsPersistent,
    handleSubmit,
  } = useLogin();

  return (
    <LoginPresenter
      studentNumber={studentNumber}
      adminPassword={adminPassword}
      isPersistent={isPersistent}
      handleChangeStudentNumber={handleChangeStudentNumber}
      handleChangeAdminPassword={handleChangeAdminPassword}
      handleChangeIsPersistent={handleChangeIsPersistent}
      handleSubmit={handleSubmit}
    />
  );
};

export default LoginContainer;
