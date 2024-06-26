import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsers,
  fetchAllItems,
  updateUser,
  updateItem,
  deleteItem,
  addNewItem,
} from "../../../reducks/user/operations";
import { RootState, AppDispatch } from "../../../reducks/store";
import { User, Item } from "../../../reducks/user/types";
import router from "next/router";

export const useAdmin = () => {
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.allUsers);
  const items = useSelector((state: RootState) => state.product.allItems);

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAllItems());
  }, [dispatch]);

  const handleUpdateUser = (student_id: number, updatedUser: User) => {
    dispatch(updateUser(student_id, updatedUser));
    // ぺージをリロードする
    router.reload();
  };

  const handleUpdateItem = (product_id: number, updatedItem: Item) => {
    dispatch(updateItem(product_id, updatedItem));
    router.reload();
  };

  const handleDeleteItem = (product_id: number) => {
    dispatch(deleteItem(product_id));
    router.reload();
  };

  const handleAddNewItem = (newItem: Item) => {
    dispatch(addNewItem(newItem));
    router.reload();
  };

  return {
    users,
    items,
    handleUpdateUser,
    handleUpdateItem,
    handleDeleteItem,
    handleAddNewItem,
  };
};
