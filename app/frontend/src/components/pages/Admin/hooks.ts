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

  const handleUpdateUser = async (student_id: number, updatedUser: User) => {
    await dispatch(updateUser(student_id, updatedUser));
    // ぺージをリロードする
    router.reload();
  };

  const handleUpdateItem = async (product_id: number, updatedItem: Item) => {
    await dispatch(updateItem(product_id, updatedItem));
    router.reload();
  };

  const handleDeleteItem = async (product_id: number) => {
    await dispatch(deleteItem(product_id));
    router.reload();
  };

  const handleAddNewItem = async (newItem: Item) => {
    await dispatch(addNewItem(newItem));
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
