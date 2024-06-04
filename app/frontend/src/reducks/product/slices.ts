import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./types";

const initialProductState: Product[] = [];

const productSlice = createSlice({
  name: "product",
  initialState: initialProductState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      return action.payload;
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.push(action.payload);
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.findIndex(
        (product) => product.product_id === action.payload.product_id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { setProducts, addProduct, updateProduct } = productSlice.actions;
export default productSlice.reducer;
