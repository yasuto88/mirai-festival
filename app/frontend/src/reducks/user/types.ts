/** reduxで扱うユーザー情報の型 */
export type User = {
  student_id: string;
  balance: number;
  possession_list: Item[];
  isAdmin: boolean;
};

/** reduxで扱うアイテム情報の型 */
export type Item = {
  product_id: number;
  product_name: string;
  quantity: number;
};
