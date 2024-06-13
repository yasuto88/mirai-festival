export type Product = {
  product_id: number; // 商品ID
  name: string; // 商品名
  description: string; // 説明
  price: number; // 価格
};

export type Products = {
  products: Product[]; // 商品一覧
};

export interface ProductState {
  products: Products;
  loading: boolean;
  error: string | null;
}
