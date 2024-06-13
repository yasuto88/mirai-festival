import { useEffect, useState } from "react";
import { Box, Sheet } from "@mui/joy";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducks/store";
import { User } from "../reducks/user";
import { setUser } from "../reducks/user/slices";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = useSelector((state: RootState) => state.user.user);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const userData = localStorage.getItem("user");
  //   if (userData) {
  //     dispatch(
  //       setUser({
  //         student_id: Number(userData),
  //         balance: 0,
  //         is_admin: false,
  //         items: [],
  //       })
  //     );
  //   }
  // }, [dispatch]);

  useEffect(() => {
    if (currentUser === null) {
      console.log("currentUser is null");
      return;
    }

    // ログインページへのリダイレクトが無限ループにならないようにする
    if (router.pathname !== "/login" && currentUser.student_id === null) {
      console.log("ログインしていません");
      setIsLoggedIn(false);
      router.push("/login");
    } else if (
      router.pathname === "/login" &&
      currentUser.student_id !== null
    ) {
      console.log("ログインしています");
      setIsLoggedIn(true);
      router.push("/");
    } else {
      setIsLoggedIn(currentUser.student_id !== null);
    }
  }, [currentUser, router.pathname]);

  // if (isLoggedIn === null) {
  //   return <div>Loading...</div>; // ローディング状態を表示
  // }

  return (
    <Sheet
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>{children}</Box>
    </Sheet>
  );
}
