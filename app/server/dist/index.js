"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const db = new better_sqlite3_1.default("example.db");
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// ユーザー登録・ログイン
app.post("/api/users/login", (req, res) => {
    const { student_id } = req.body;
    let user = db
        .prepare("SELECT * FROM users WHERE student_id = ?")
        .get(student_id);
    if (!user) {
        const insertUser = db.prepare("INSERT INTO users (student_id, balance, possession_list) VALUES (?, ?, ?)");
        insertUser.run(student_id, 1000, "[]");
        user = db
            .prepare("SELECT * FROM users WHERE student_id = ?")
            .get(student_id);
    }
    res.json(user);
});
// 管理者ログイン
app.post("/api/admins/login", (req, res) => {
    const { admin_id, password } = req.body;
    // パスワードの確認
    const adminPassword = db
        .prepare("SELECT password FROM admin_passwords WHERE id = 1")
        .get();
    if (adminPassword.password === password) {
        const adminData = {
            student_id: admin_id,
            balance: 0,
            possession_list: [],
            isAdmin: true,
        };
        res.json(adminData);
    }
    else {
        res.status(401).json({ error: "Unauthorized" });
    }
});
// ユーザー情報取得
app.get("/api/users/:student_id", (req, res) => {
    const { student_id } = req.params;
    const user = db
        .prepare("SELECT * FROM users WHERE student_id = ?")
        .get(student_id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
});
// ユーザー情報更新
app.put("/api/users/:student_id", (req, res) => {
    const { student_id } = req.params;
    const { balance, possession_list } = req.body;
    const updateUser = db.prepare("UPDATE users SET balance = ?, possession_list = ? WHERE student_id = ?");
    const result = updateUser.run(balance, JSON.stringify(possession_list), student_id);
    if (result.changes === 0) {
        return res.status(404).json({ error: "User not found or not updated" });
    }
    res.json({ success: true });
});
// 商品一覧取得
app.get("/api/products", (req, res) => {
    const products = db.prepare("SELECT * FROM products").all();
    res.json(products);
});
// 商品追加
app.post("/api/products", (req, res) => {
    const { product_name, price } = req.body;
    const insertProduct = db.prepare("INSERT INTO products (product_name, price) VALUES (?, ?)");
    const result = insertProduct.run(product_name, price);
    const newProduct = db
        .prepare("SELECT * FROM products WHERE product_id = ?")
        .get(result.lastInsertRowid);
    res.json(newProduct);
});
// 商品情報更新
app.put("/api/products/:product_id", (req, res) => {
    const { product_id } = req.params;
    const { product_name, price } = req.body;
    const updateProduct = db.prepare("UPDATE products SET product_name = ?, price = ? WHERE product_id = ?");
    const result = updateProduct.run(product_name, price, product_id);
    if (result.changes === 0) {
        return res.status(404).json({ error: "Product not found or not updated" });
    }
    res.json({ success: true });
});
// 商品削除
app.delete("/api/products/:product_id", (req, res) => {
    const { product_id } = req.params;
    const deleteProduct = db.prepare("DELETE FROM products WHERE product_id = ?");
    const result = deleteProduct.run(product_id);
    if (result.changes === 0) {
        return res.status(404).json({ error: "Product not found or not deleted" });
    }
    res.json({ success: true });
});
// QRコードを用いた商品追加
app.post("/api/qr", (req, res) => {
    const { student_id, product_id } = req.body;
    const product = db
        .prepare("SELECT price, product_name FROM products WHERE product_id = ?")
        .get(product_id);
    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }
    const user = db
        .prepare("SELECT balance, possession_list FROM users WHERE student_id = ?")
        .get(student_id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    if (user.balance < product.price) {
        return res.status(400).json({ error: "Insufficient balance" });
    }
    const possessionList = JSON.parse(user.possession_list);
    const existingProduct = possessionList.find((item) => item.product_id === product_id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    }
    else {
        possessionList.push({
            product_id,
            product_name: product.product_name,
            quantity: 1,
        });
    }
    const newBalance = user.balance - product.price;
    const updateUser = db.prepare("UPDATE users SET balance = ?, possession_list = ? WHERE student_id = ?");
    updateUser.run(newBalance, JSON.stringify(possessionList), student_id);
    const updatedUser = db
        .prepare("SELECT * FROM users WHERE student_id = ?")
        .get(student_id);
    res.json(updatedUser);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
