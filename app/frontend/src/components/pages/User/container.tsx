import React from "react";
import UserPagePresenter from "./presenter";
import { useUserPage } from "./hooks";

const UserPageContainer: React.FC = () => {
  const user = useUserPage();

  if (!user.student_id) {
    return null; // ログインページに遷移するまでの間、何も表示しない
  }

  return <UserPagePresenter {...user} />;
};

export default UserPageContainer;
