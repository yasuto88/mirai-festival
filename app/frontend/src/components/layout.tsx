import { useEffect, useState } from "react";
import { Box, Sheet } from "@mui/joy";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
