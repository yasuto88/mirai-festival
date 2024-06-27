import express from "express";
import bodyParser from "body-parser";
import Database from "better-sqlite3";
import cors from "cors";

import https from "https";
import fs from "fs";

const app = express();
const db = new Database("example.db");

app.use(bodyParser.json());
app.use(cors());

// ログ用ミドルウェア
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log("Request Body:", req.body);
  next();
});

// ユーザー登録・ログイン
app.post("/api/users/login", (req, res) => {
  const { student_id } = req.body;
  console.log("User login attempt:", student_id);

  let user = db
    .prepare("SELECT * FROM users WHERE student_id = ?")
    .get(parseInt(student_id, 10));

  if (!user) {
    const insertUser = db.prepare(
      "INSERT INTO users (student_id, balance, possession_list, isAdmin) VALUES (?, ?, ?, ?)"
    );
    insertUser.run(parseInt(student_id, 10), 1000, JSON.stringify([]), 0);
    user = db
      .prepare("SELECT * FROM users WHERE student_id = ?")
      .get(parseInt(student_id, 10));
  }

  // possession_listをパース
  user.possession_list = JSON.parse(user.possession_list);

  console.log("User logged in or registered:", user);
  res.json(user);
});

// 管理者ログイン
app.post("/api/admins/login", (req, res) => {
  const { admin_id, password } = req.body;
  console.log("Admin login attempt:", admin_id);

  // パスワードの確認
  const adminPassword = db
    .prepare("SELECT password FROM admin_passwords WHERE id = 1")
    .get();

  if (adminPassword.password === password) {
    const adminData = {
      student_id: Number(admin_id),
      balance: 0,
      possession_list: [],
      isAdmin: true,
    };

    console.log("Admin logged in:", adminData);
    res.json(adminData);
  } else {
    console.log("Admin login failed: Unauthorized");
    res.status(401).json({ error: "Unauthorized" });
  }
});

// ユーザー情報取得
app.get("/api/users/:student_id", (req, res) => {
  const { student_id } = req.params;
  console.log("Fetching user info for:", student_id);

  let user = db
    .prepare("SELECT * FROM users WHERE student_id = ?")
    .get(parseInt(student_id, 10));

  if (!user) {
    console.log("User not found:", student_id);
    return res.status(404).json({ error: "User not found" });
  }

  // possession_listをパース
  user.possession_list = JSON.parse(user.possession_list);

  console.log("User info:", user);
  res.json(user);
});

// ユーザー情報更新
app.put("/api/users/:student_id", (req, res) => {
  const { student_id } = req.params;
  const { balance, possession_list } = req.body;
  console.log("Updating user info for:", student_id);
  console.log("New balance:", balance, "New possession list:", possession_list);

  const updateUser = db.prepare(
    "UPDATE users SET balance = ?, possession_list = ? WHERE student_id = ?"
  );
  const result = updateUser.run(
    balance,
    JSON.stringify(possession_list),
    Number(student_id)
  );

  if (result.changes === 0) {
    console.log("User not found or not updated:", student_id);
    return res.status(404).json({ error: "User not found or not updated" });
  }

  console.log("User updated:", student_id);
  res.json({ success: true });
});

// 商品一覧取得
app.get("/api/products", (req, res) => {
  console.log("Fetching all products");
  const products = db.prepare("SELECT * FROM products").all();
  console.log("Products:", products);
  res.json(products);
});

// 指定したIDの商品情報を取得
app.get("/api/products/:product_id", (req, res) => {
  const { product_id } = req.params;
  console.log("Fetching product info for:", product_id);

  const product = db
    .prepare("SELECT * FROM products WHERE product_id = ?")
    .get(parseInt(product_id, 10));

  if (!product) {
    console.log("Product not found:", product_id);
    return res.status(404).json({ error: "Product not found" });
  }

  console.log("Product info:", product);
  res.json(product);
});

// 商品追加
app.post("/api/products", (req, res) => {
  const { product_name, price } = req.body;
  console.log("Adding new product:", product_name, price);

  const insertProduct = db.prepare(
    "INSERT INTO products (product_name, price) VALUES (?, ?)"
  );
  const result = insertProduct.run(product_name, price);

  const newProduct = db
    .prepare("SELECT * FROM products WHERE product_id = ?")
    .get(result.lastInsertRowid);
  console.log("Product added:", newProduct);
  res.json(newProduct);
});

// 商品情報更新
app.put("/api/products/:product_id", (req, res) => {
  const { product_id } = req.params;
  const { product_name, price } = req.body;
  console.log("Updating product:", product_id, product_name, price);

  const updateProduct = db.prepare(
    "UPDATE products SET product_name = ?, price = ? WHERE product_id = ?"
  );
  const result = updateProduct.run(product_name, price, product_id);

  if (result.changes === 0) {
    console.log("Product not found or not updated:", product_id);
    return res.status(404).json({ error: "Product not found or not updated" });
  }

  console.log("Product updated:", product_id);
  res.json({ success: true });
});

// 商品削除
app.delete("/api/products/:product_id", (req, res) => {
  const { product_id } = req.params;
  console.log("Deleting product:", product_id);

  const deleteProduct = db.prepare("DELETE FROM products WHERE product_id = ?");
  const result = deleteProduct.run(product_id);

  if (result.changes === 0) {
    console.log("Product not found or not deleted:", product_id);
    return res.status(404).json({ error: "Product not found or not deleted" });
  }

  console.log("Product deleted:", product_id);
  res.json({ success: true });
});

// 商品追加 (修正後)
app.post("/api/add-product", (req, res) => {
  const { student_id, product_id, quantity } = req.body;
  console.log("Adding product via QR code:", student_id, product_id, quantity);

  if (quantity <= 0) {
    console.log("Invalid quantity:", quantity);
    return res.status(400).json({ error: "Invalid quantity" });
  }

  const product = db
    .prepare("SELECT price, product_name FROM products WHERE product_id = ?")
    .get(product_id);
  if (!product) {
    console.log("Product not found:", product_id);
    return res.status(404).json({ error: "Product not found" });
  }

  const user = db
    .prepare("SELECT balance, possession_list FROM users WHERE student_id = ?")
    .get(Number(student_id));
  if (!user) {
    console.log("User not found:", student_id);
    return res.status(404).json({ error: "User not found" });
  }

  if (user.balance < product.price * quantity) {
    console.log("Insufficient balance:", student_id);
    return res.status(400).json({ error: "Insufficient balance" });
  }

  const possessionList = JSON.parse(user.possession_list);
  const existingProduct = possessionList.find(
    (item: any) => item.product_id === product_id
  );

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    possessionList.push({
      product_id,
      product_name: product.product_name,
      quantity: quantity,
      price: product.price,
    });
  }

  const newBalance = user.balance - product.price * quantity;
  const updateUser = db.prepare(
    "UPDATE users SET balance = ?, possession_list = ? WHERE student_id = ?"
  );
  const result = updateUser.run(
    newBalance,
    JSON.stringify(possessionList),
    Number(student_id)
  );

  if (result.changes === 0) {
    console.log("User not found or not updated:", student_id);
    return res.status(404).json({ error: "User not found or not updated" });
  }

  const updatedUser = db
    .prepare("SELECT * FROM users WHERE student_id = ?")
    .get(Number(student_id));
  updatedUser.possession_list = JSON.parse(updatedUser.possession_list);
  console.log("User updated via QR code:", updatedUser);
  res.json(updatedUser);
});

// すべてのユーザー情報取得
app.get("/api/users", (req, res) => {
  console.log("Fetching all users");

  const users = db.prepare("SELECT * FROM users").all();
  users.forEach((user) => {
    user.possession_list = JSON.parse(user.possession_list);
  });

  console.log("Users:", users);
  res.json(users);
});

// すべてのアイテム情報取得
app.get("/api/items", (req, res) => {
  console.log("Fetching all items");

  const items = db.prepare("SELECT * FROM products").all();
  console.log("Items:", items);
  res.json(items);
});

const options = {
  key: fs.readFileSync("../certificates/rootCA-key.pem"),
  cert: fs.readFileSync("../certificates/rootCA.pem"),
};

const PORT = parseInt(process.env.PORT || "3000", 10);
https.createServer(options, app).listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
