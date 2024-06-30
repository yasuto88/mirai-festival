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
    student_id INTEGER PRIMARY KEY,
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

// 初期アイテムの定義
const initialItem = {
  product_id: 1,
  product_name: "Sample Product",
  quantity: 10,
};

// サンプルデータ挿入
const insertUser = db.prepare(`
INSERT INTO users (student_id, balance, possession_list, isAdmin) VALUES (?, ?, ?, ?)
`);

// 学籍番号12345678のユーザーに初期アイテムを設定
insertUser.run(12345678, 1000, JSON.stringify([initialItem]), 0);
insertUser.run(87654321, 500, JSON.stringify([]), 0);

const insertProduct = db.prepare(`
INSERT INTO products (product_id, product_name, price) VALUES (?, ?, ?)
`);

// insertProduct.run(${product_id}, "${product_name}", ${price});
// insertProduct.run(1, "Product A", 200);
// insertProduct.run(2, "Product B", 150);
insertProduct.run(1, "吸魂魔法の書", 50);
insertProduct.run(2, "復活魔法の書", 200);
insertProduct.run(3, "月光魔法の書", 100);
insertProduct.run(4, "魅儡石", 0);
insertProduct.run(5, "アイプタイト", 0);
insertProduct.run(6, "OKStone", 0);

// 管理者パスワードのサンプルデータ挿入
const insertAdminPassword = db.prepare(`
INSERT INTO admin_passwords (password) VALUES (?)
`);

// 管理者パスワードを "Iput-admin1234" に設定
insertAdminPassword.run("Iput-admin1234");

console.log("Tables created and sample data inserted successfully.");
