export type Event = {
  event_id: number; // イベントID
  title: string; // タイトル
  details: string; // 詳細
  start_time: string; // 開始時間
  end_time: string; // 終了時間
  result: "win" | "lose" | "draw" | null; // 結果
  choices: Choice[]; // 選択肢
};

export type Choice = {
  choice_id: number; // 選択肢ID
  name: string; // 選択肢名
  odds: number; // オッズ
};

export type Events = {
  events: Event[]; // イベント一覧
};
