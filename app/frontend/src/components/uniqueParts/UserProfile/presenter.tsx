import React from "react";
import { Box, Typography } from "@mui/joy";

type Props = {
  studentId: number | null;
  balance: number;
};

const UserProfilePresenter: React.FC<Props> = ({ studentId, balance }) => (
  <Box sx={{ padding: 2, mb: 2 }}>
    <Typography level="title-lg">ID: {studentId}</Typography>
    <Typography level="title-md">所持金: {balance}G</Typography>
  </Box>
);

export default UserProfilePresenter;
