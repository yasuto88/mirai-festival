import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, addItem } from "../../../reducks/user/operations";
import { AppDispatch, RootState } from "../../../reducks/store";
import { Item } from "../../../reducks/user/types";

export const useBuy = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch: AppDispatch = useDispatch();
  const [product, setProduct] = useState<Item | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState<"success" | "error">(
    "success"
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(Number(id))).then((data) => {
        if (data) {
          setProduct(data);
        }
      });
    } else {
      console.log("id is not found");
    }
  }, [id, dispatch]);

  const handleAddItem = async () => {
    const student_id = Number(localStorage.getItem("student_id"));
    if (id && product) {
      try {
        await dispatch(addItem(student_id, Number(id), quantity));
        setSnackbarMessage("購入が成功しました！");
        setSnackbarColor("success");
        setSnackbarOpen(true);
      } catch (error: any) {
        if (error instanceof Error) {
          let message = "";
          if (error.message === "Error: Invalid quantity") {
            message = "数量が不正です。";
          } else if (error.message === "Error: Product not found") {
            message = "商品が見つかりません。";
          } else if (error.message === "Error: User not found") {
            message = "ユーザーが見つかりません。";
          } else if (error.message === "Insufficient balance") {
            message = "残高が不足しています。";
          } else {
            message = "不明なエラーが発生しました。";
          }
          setSnackbarMessage(`購入に失敗しました : ${message}`);
        } else {
          console.log("error", error);
          setSnackbarMessage("購入に失敗しました。");
        }
        setSnackbarColor("error");
        setSnackbarOpen(true);
      }
    }
  };

  return {
    product,
    quantity,
    setQuantity,
    handleAddItem,
    snackbarOpen,
    setSnackbarOpen,
    snackbarMessage,
    snackbarColor,
  };
};
