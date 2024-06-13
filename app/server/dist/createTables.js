"use strict";
const Database = require("better-sqlite3");
// データベースの接続
const db = new Database("example.db");
// テーブル削除（存在する場合）
db.exec(`DROP TABLE IF EXISTS users`);
db.exec(`DROP TABLE IF EXISTS products`);
db.exec(`DROP TABLE IF EXISTS admin_passwords`);
// テーブル作成
db.exec(`
CREATE TABLE IF NOT EXISTS users (
    student_id TEXT PRIMARY KEY,
    balance INTEGER NOT NULL,
    possession_list TEXT NOT NULL,
    isAdmin INTEGER NOT NULL DEFAULT 0
);
`);
db.exec(`
CREATE TABLE IF NOT EXISTS products (
    product_id INTEGER PRIMARY KEY,
    product_name TEXT NOT NULL,
    price INTEGER NOT NULL
);
`);
db.exec(`
CREATE TABLE IF NOT EXISTS admin_passwords (
    id INTEGER PRIMARY KEY,
    password TEXT NOT NULL
);
`);
// サンプルデータ挿入
const insertUser = db.prepare(`
INSERT INTO users (student_id, balance, possession_list, isAdmin) VALUES (?, ?, ?, ?)
`);
insertUser.run("12345678", 1000, "[]", 0);
insertUser.run("87654321", 500, "[]", 0);
const insertProduct = db.prepare(`
INSERT INTO products (product_id, product_name, price) VALUES (?, ?, ?)
`);
insertProduct.run(1, "Product A", 200);
insertProduct.run(2, "Product B", 150);
// 管理者パスワードのサンプルデータ挿入
const insertAdminPassword = db.prepare(`
INSERT INTO admin_passwords (password) VALUES (?)
`);
insertAdminPassword.run("admin_password");
console.log("Tables created and sample data inserted successfully.");
