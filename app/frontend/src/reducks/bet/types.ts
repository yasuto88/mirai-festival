export type Bet = {
  bet_id: number; // ベットID
  event_id: number; // イベントID
  choice: string; // 選択した選択肢
  amount: number; // 金額
  student_id: number; // 学籍番号
  status: "open" | "closed" | "resolved"; // ステータス
  result: "pending" | "win" | "lose" | "draw"; // 結果
};
