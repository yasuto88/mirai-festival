export type User = {
  student_id: number | null; // 学籍番号
  balance: number; // 残高
  is_admin: boolean; // 管理者かどうか
  items: Item[] | null; // 商品リスト
};

export type Item = {
  item_id: number; // 商品ID
  name: string; // 商品名
  quantity: number; // 数量
};

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
