import { createSelector } from "reselect";
import { RootState } from "../store";

const productSelector = (state: RootState) => state.products;

export const loadProducts = createSelector(
  [productSelector],
  (products) => products
);

export const loadProductById = (productId: number) =>
  createSelector([productSelector], (products) =>
    products.find((product) => product.product_id === productId)
  );
