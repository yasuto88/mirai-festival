import React from "react";
import UserProfilePresenter from "./presenter";
import { useUserProfile } from "./hooks";

const UserProfileContainer: React.FC = () => {
  const { studentId, balance } = useUserProfile();

  return (
    <UserProfilePresenter
      studentId={studentId}
      balance={balance}
      // handleLogout={handleLogout}
    />
  );
};

export default UserProfileContainer;
