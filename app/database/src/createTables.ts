import connection from "./db";

// テーブル作成クエリ
const createUsersTable = `
CREATE TABLE IF NOT EXISTS Users (
  student_id INT PRIMARY KEY,
  balance FLOAT DEFAULT 0.0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`;

const createEventsTable = `
CREATE TABLE IF NOT EXISTS Events (
  event_id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  details TEXT,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`;

const createBetsTable = `
CREATE TABLE IF NOT EXISTS Bets (
  bet_id INT PRIMARY KEY AUTO_INCREMENT,
  event_id INT,
  choice VARCHAR(255) NOT NULL,
  amount FLOAT NOT NULL,
  student_id INT,
  status VARCHAR(50) DEFAULT 'open',
  result VARCHAR(50) DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES Events(event_id),
  FOREIGN KEY (student_id) REFERENCES Users(student_id)
)`;

const createProductsTable = `
CREATE TABLE IF NOT EXISTS Products (
  product_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price FLOAT NOT NULL,
  stock INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`;

const createPurchaseLogsTable = `
CREATE TABLE IF NOT EXISTS PurchaseLogs (
  log_id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT,
  student_id INT,
  purchase_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  quantity INT NOT NULL,
  total_amount FLOAT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES Products(product_id),
  FOREIGN KEY (student_id) REFERENCES Users(student_id)
)`;

const createAdminsTable = `
CREATE TABLE IF NOT EXISTS Admins (
  admin_id INT PRIMARY KEY AUTO_INCREMENT,
  password VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`;

// テーブル作成
const tables = [
  createUsersTable,
  createEventsTable,
  createBetsTable,
  createProductsTable,
  createPurchaseLogsTable,
  createAdminsTable,
];

tables.forEach;
