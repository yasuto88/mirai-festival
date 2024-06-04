import { Action } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { setProducts, addProduct, updateProduct } from "./slices";
import { Product } from "./types";

export const fetchProducts = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      // データベースから商品を取得するコードを追加してください
      const products: Product[] = []; // 仮のデータ

      dispatch(setProducts(products));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };
};

export const createProduct = (product: Product) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      // データベースに商品を保存するコードを追加してください
      dispatch(addProduct(product));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };
};

export const modifyProduct = (product: Product) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      // データベースの商品を更新するコードを追加してください
      dispatch(updateProduct(product));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };
};

export const deleteProduct = (productId: number) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      // データベースの商品を削除するコードを追加してください
      const products: Product[] = []; // 仮のデータ
      dispatch(
        setProducts(
          products.filter((product) => product.product_id !== productId)
        )
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };
};
