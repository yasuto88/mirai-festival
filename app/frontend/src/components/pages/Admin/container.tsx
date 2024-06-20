import React, { useEffect } from "react";
import AdminPagePresenter from "./presenter";
import { useAdmin } from "./hooks";

const AdminPageContainer: React.FC = () => {
  const {
    users,
    items,
    handleUpdateUser,
    handleUpdateItem,
    handleDeleteItem,
    handleAddNewItem,
  } = useAdmin();
  
  return (
    <AdminPagePresenter
      users={users}
      items={items}
      handleUpdateUser={handleUpdateUser}
      handleUpdateItem={handleUpdateItem}
      handleDeleteItem={handleDeleteItem}
      handleAddNewItem={handleAddNewItem}
    />
  );
};

export default AdminPageContainer;
