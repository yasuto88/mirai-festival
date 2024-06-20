import React from "react";
import {
  Box,
  Button,
  Table,
  Typography,
  Modal,
  ModalDialog,
  Stack,
  Input,
  FormControl,
  FormLabel,
  Sheet,
} from "@mui/joy";
import { User, Item } from "../../../reducks/user/types";
import Logout from "../../uniqueParts/Logout";

type Props = {
  users: User[];
  items: Item[];
  handleUpdateUser: (student_id: number, updatedUser: User) => void;
  handleUpdateItem: (product_id: number, updatedItem: Item) => void;
  handleDeleteItem: (product_id: number) => void;
  handleAddNewItem: (newItem: Item) => void;
};

const AdminPagePresenter: React.FC<Props> = ({
  users,
  items,
  handleUpdateUser,
  handleUpdateItem,
  handleDeleteItem,
  handleAddNewItem,
}) => {
  const [editUser, setEditUser] = React.useState<User | null>(null);
  const [editItem, setEditItem] = React.useState<Item | null>(null);
  const [newItem, setNewItem] = React.useState<Item>({
    product_id: 0,
    product_name: "",
    quantity: 0,
    price: 0,
  });

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editUser) {
      setEditUser({ ...editUser, [e.target.name]: e.target.value });
    }
  };

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editItem) {
      setEditItem({ ...editItem, [e.target.name]: e.target.value });
    }
  };

  const handleNewItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const [isUserModalOpen, setIsUserModalOpen] = React.useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = React.useState(false);

  const openUserModal = (user: User) => {
    setEditUser(user);
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setEditUser(null);
    setIsUserModalOpen(false);
  };

  const openItemModal = (item: Item) => {
    setEditItem(item);
    setIsItemModalOpen(true);
  };

  const closeItemModal = () => {
    setEditItem(null);
    setIsItemModalOpen(false);
  };

  return (
    <Sheet
      sx={{
        maxWidth: "400px",
        paddingTop: 16,
      }}
    >
      
        <Logout />
        <Typography level="h4" sx={{ mb: 2 }}>
          ユーザー管理
        </Typography>
        <Table variant="soft">
          <thead>
            <tr>
              <th>学籍番号</th>
              <th>所持金</th>
              <th>所持品</th>
              <th>アクション</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.student_id}>
                <td>{user.student_id}</td>
                <td>{user.balance}</td>
                <td>
                  {user.possession_list.map((item) => (
                    <span key={item.product_id}>
                      {item.product_name} x {item.quantity}
                      <br />
                    </span>
                  ))}
                </td>
                <td>
                  <Button onClick={() => openUserModal(user)}>編集</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal open={isUserModalOpen} onClose={closeUserModal}>
          <ModalDialog>
            <Typography level="h4">
              ユーザー編集: {editUser?.student_id}
            </Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Input
                name="balance"
                type="number"
                value={editUser?.balance || ""}
                onChange={handleUserChange}
                fullWidth
                placeholder="所持金"
              />
              <Button
                onClick={() => {
                  if (editUser) handleUpdateUser(editUser.student_id, editUser);
                  closeUserModal();
                }}
              >
                保存
              </Button>
            </Stack>
          </ModalDialog>
        </Modal>

        <Typography level="h4" sx={{ mt: 4, mb: 2 }}>
          アイテム管理
        </Typography>
        <Table variant="soft">
          <thead>
            <tr>
              <th>商品ID</th>
              <th>商品名</th>
              <th>価格</th>
              <th>アクション</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item) => (
              <tr key={item.product_id}>
                <td>{item.product_id}</td>
                <td>{item.product_name}</td>
                <td>{item.price}</td>
                <td>
                  <Button onClick={() => openItemModal(item)}>編集</Button>
                  <Button onClick={() => handleDeleteItem(item.product_id)}>
                    削除
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal open={isItemModalOpen} onClose={closeItemModal}>
          <ModalDialog>
            <Typography level="h4">
              アイテム編集: {editItem?.product_id}
            </Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Input
                name="product_name"
                value={editItem?.product_name || ""}
                onChange={handleItemChange}
                fullWidth
                placeholder="商品名"
              />
              <Input
                name="price"
                type="number"
                value={editItem?.price || ""}
                onChange={handleItemChange}
                fullWidth
                placeholder="価格"
              />
              <Button
                onClick={() => {
                  if (editItem) handleUpdateItem(editItem.product_id, editItem);
                  closeItemModal();
                }}
              >
                保存
              </Button>
            </Stack>
          </ModalDialog>
        </Modal>

        <Typography level="h4" sx={{ mt: 4, mb: 2 }}>
          新しいアイテムを追加
        </Typography>
        <Box sx={{ mt: 2 }}>
          <FormControl>
            <FormLabel>商品名</FormLabel>
            <Input
              type="text"
              name="product_name"
              value={newItem.product_name}
              onChange={handleNewItemChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>価格</FormLabel>
            <Input
              type="number"
              name="price"
              value={newItem.price}
              onChange={handleNewItemChange}
            />
          </FormControl>
          <Button onClick={() => handleAddNewItem(newItem)}>追加</Button>
        </Box>
    </Sheet>
  );
};

export default AdminPagePresenter;
