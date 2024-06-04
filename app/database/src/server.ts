import express from "express";
import connection from "./db";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

// ユーザー情報取得のエンドポイント
app.get("/api/users", (req, res) => {
  connection.query("SELECT * FROM Users", (error, results) => {
    if (error) {
      console.error("Error fetching users:", error);
      res.status(500).send("Error fetching users");
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
