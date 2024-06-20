/** reduxで扱うユーザー情報の型 */
export type User = {
  student_id: number;
  balance: number;
  possession_list: Item[];
  isAdmin: boolean;
  allUsers: User[]; // allUsers プロパティを追加
  error?: string | null; // エラーメッセージ用のプロパティ
};

/** reduxで扱うアイテム情報の型 */
export type Item = {
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
};
