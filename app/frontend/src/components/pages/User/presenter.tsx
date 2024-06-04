import React from "react";
import { Box, Sheet } from "@mui/joy";
import { UserProfile } from "../../uniqueParts/UserProfile";
import { QRCodeScanner } from "../../uniqueParts/QRCodeScanner";
import { ItemTable } from "../../uniqueParts/ItemTable";

type UserItem = {
  name: string;
  quantity: number;
};

type Props = {};

const UserPagePresenter: React.FC<Props> = () => (
  <Sheet
    sx={{
      maxWidth: 300,
      margin: "0 auto",
      padding: 2,
      display: "flex",
      flexDirection: "column",
      gap: 2,
      justifyContent: "center",
      alignItems: "center",
    }}
    variant="outlined"
  >
    <UserProfile />
    <ItemTable />
    <QRCodeScanner />
  </Sheet>
);

export default UserPagePresenter;
