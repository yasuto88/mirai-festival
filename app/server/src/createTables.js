"use strict";
exports.__esModule = true;
var sqlite3 = require("better-sqlite3");
// データベースの接続
var db = sqlite3("example.db");
// テーブル削除（存在する場合）
db.exec("DROP TABLE IF EXISTS users");
db.exec("DROP TABLE IF EXISTS products");
// テーブル作成
db.exec("\nCREATE TABLE IF NOT EXISTS users (\n    student_id TEXT PRIMARY KEY,\n    balance INTEGER NOT NULL,\n    possession_list TEXT NOT NULL\n);\n");
db.exec("\nCREATE TABLE IF NOT EXISTS products (\n    product_id INTEGER PRIMARY KEY,\n    product_name TEXT NOT NULL,\n    price INTEGER NOT NULL\n);\n");
// サンプルデータ挿入
var insertUser = db.prepare("\nINSERT INTO users (student_id, balance, possession_list) VALUES (?, ?, ?)\n");
insertUser.run("12345678", 1000, "[]");
insertUser.run("87654321", 500, "[]");
var insertProduct = db.prepare("\nINSERT INTO products (product_id, product_name, price) VALUES (?, ?, ?)\n");
insertProduct.run(1, "Product A", 200);
insertProduct.run(2, "Product B", 150);
console.log("Tables created and sample data inserted successfully.");
