import React from "react";
import { Box, Button, Typography, Input, Stack } from "@mui/joy";
import Snackbar from "@mui/joy/Snackbar";
import { Item } from "../../../reducks/user/types";
import router from "next/router";

type Props = {
  product: Item | null;
  quantity: number;
  setQuantity: (quantity: number) => void;
  handleAddItem: () => void;
  snackbarOpen: boolean;
  setSnackbarOpen: (open: boolean) => void;
  snackbarMessage: string;
  snackbarColor: "success" | "error";
};

const BuyPagePresenter: React.FC<Props> = ({
  product,
  quantity,
  setQuantity,
  handleAddItem,
  snackbarOpen,
  setSnackbarOpen,
  snackbarMessage,
  snackbarColor,
}) => (
  <Box sx={{ padding: 2 }}>
    {product ? (
      <>
        <Typography level="h4">{product.product_name}</Typography>
        <Typography level="h4">価格:{product.price}</Typography>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (value < 1) {
              setQuantity(0);
            } else if (isNaN(value)) {
              e.preventDefault()
              return
            }
            else {
              setQuantity(value);
            }
          }}
        />
        <Button onClick={handleAddItem}>購入</Button>
      </>
    ) : (
      <Typography>商品情報を取得中...</Typography>
    )}
    <Snackbar
      autoHideDuration={3000}
      variant="outlined"
      color={snackbarColor === "success" ? "success" : "danger"}
      size="lg"
      invertedColors
      open={snackbarOpen}
      onClose={() => setSnackbarOpen(false)}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={(theme) => ({
        background: `linear-gradient(45deg, ${theme.palette.primary[600]} 30%, ${theme.palette.primary[500]} 90%})`,
        maxWidth: 360,
      })}
    >
      <div>
        <Typography level="title-lg">
          {snackbarColor === "success" ? "Success" : "Error"}
        </Typography>
        <Typography sx={{ mt: 1, mb: 2 }}>{snackbarMessage}</Typography>
        <Button
          variant="soft"
          // color="success"
          color={snackbarColor === "success" ? "success" : "danger"}
          onClick={() => {
            // ホームにリダイレクト
            router.push("/");
          }}
        >
          ホームにリダイレクト
        </Button>
      </div>
    </Snackbar>
  </Box>
);

export default BuyPagePresenter;
