import React, { useEffect, useState } from "react";
import { Box, Sheet } from "@mui/joy";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../reducks/store";
import { fetchUser } from "../reducks/user/operations";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const [isHydrated, setIsHydrated] = useState(false); // Hydrationチェック用の状態

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedStudentId = localStorage.getItem("student_id");
      if (storedStudentId) {
        dispatch(fetchUser(parseInt(storedStudentId, 10))).finally(() => {
          setIsHydrated(true); // Hydrationが完了したことを示す
        });
      } else {
        setIsHydrated(true); // ログインしていない状態でもHydrationを完了とする
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (isHydrated) {
      if (user.student_id) {
        const redirectTo = localStorage.getItem("redirectAfterLogin") || "/";
        localStorage.removeItem("redirectAfterLogin"); // 保存されたURLを削除
        if (router.asPath === "/login") {
          router.push(redirectTo); // 保存されたURLにリダイレクト
        }
      } else {
        if (router.asPath !== "/login") {
          localStorage.setItem("redirectAfterLogin", router.asPath); // 現在のURLを保存
          router.push("/login");
        }
      }
    }
  }, [isHydrated, user.student_id, router]);

  if (!isHydrated) {
    return (
      <div>
        <Box sx={{ padding: 2 }}>Loading...</Box>
      </div>
    );
  }

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
