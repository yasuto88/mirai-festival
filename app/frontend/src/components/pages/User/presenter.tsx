import React from "react";
import { Box, Sheet } from "@mui/joy";
import { User } from "../../../reducks/user";
import { ItemTable } from "../../uniqueParts/ItemTable";
import { QRCodeScanner } from "../../uniqueParts/QRCodeScanner";
import { UserProfile } from "../../uniqueParts/UserProfile";

type Props = User;

const UserPagePresenter: React.FC<Props> = (props) => (
  <Sheet
    sx={{
      margin: "0 auto",
      padding: 2,
      display: "flex",
      flexDirection: "column",
      gap: 2,
      justifyContent: "center",
      alignItems: "center",
      height: "100dvh",
      maxWidth: "400px",
    }}
    // variant="soft"
  >
    <UserProfile />
    <ItemTable />
    <QRCodeScanner />
  </Sheet>
);

export default UserPagePresenter;
