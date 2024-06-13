import React from "react";
import { Box, Sheet } from "@mui/joy";
import { UserProfile } from "../../uniqueParts/UserProfile";
import { QRCodeScanner } from "../../uniqueParts/QRCodeScanner";
import { ItemTable } from "../../uniqueParts/ItemTable";
import { User } from "../../../reducks/user";

type Props = User;

const UserPagePresenter: React.FC<Props> = (props) => (
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
    {/* <UserProfile {...props} />
    <ItemTable {...props} />
    <QRCodeScanner {...props} /> */}
  </Sheet>
);

export default UserPagePresenter;
