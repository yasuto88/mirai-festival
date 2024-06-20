import React from "react";
import { useRouter } from "next/router";
import Button from "@mui/joy/Button";
import LogoutIcon from "@mui/icons-material/Logout";

const Logout: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("student_id");
    // ページをリロードする
    router.reload();
  };

  return (
    <Button
      endDecorator={<LogoutIcon />}
      color="primary"
      variant="soft"
      sx={{
        height: 40,
      }}
      onClick={handleLogout}
    >
      ログアウト
    </Button>
  );
};

export default Logout;
