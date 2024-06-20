import React from "react";
import { Box, Button, Stack, Typography } from "@mui/joy";
import LogoutIcon from "@mui/icons-material/Logout";
import Logout from "../Logout";

type Props = {
  studentId: number | null;
  balance: number;
  // handleLogout: () => void;
};

const UserProfilePresenter: React.FC<Props> = ({
  studentId,
  balance,
  // handleLogout,
}) => (
  <Stack direction={"row"} alignItems={"start"} gap={3}>
    <Box>
      <Typography level="title-lg">ID: {studentId}</Typography>
      <Typography level="title-md">所持金: {balance}G</Typography>
    </Box>
    {/* <Button
      endDecorator={<LogoutIcon />}
      color="primary"
      variant="soft"
      sx={{
        height: 40,
      }}
      onClick={handleLogout}
    >
      ログアウト
    </Button> */}
    <Logout />
  </Stack>
);

export default UserProfilePresenter;
