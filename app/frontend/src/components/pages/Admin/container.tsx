import React, { useEffect } from "react";
import AdminPagePresenter from "./presenter";
import { useAdmin } from "./hooks";

const AdminPageContainer: React.FC = () => {
  const {
    users,
    items,
    handleUpdateUser,
    handleUpdateItem,
    handleDeleteUser,
    handleDeleteItem,
    handleAddNewItem,
  } = useAdmin();

  return (
    <AdminPagePresenter
      users={users}
      items={items}
      handleUpdateUser={handleUpdateUser}
      handleDeleteUser={handleDeleteUser}
      handleUpdateItem={handleUpdateItem}
      handleDeleteItem={handleDeleteItem}
      handleAddNewItem={handleAddNewItem}
    />
  );
};

export default AdminPageContainer;
