import dotenv from "dotenv";
import mysql from "mysql";

// 環境変数のロード
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("データベースへの接続エラー:", err.stack);
    return;
  }
  console.log("データベースに接続されました");
});

export default connection;
