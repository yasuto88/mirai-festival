# table

## mirai-festival

### Users テーブル

| カラム名      | データ型        | 制約                          |
|---------------|-----------------|-------------------------------|
| student_id    | INT             | PRIMARY KEY                   |
| balance       | FLOAT           | DEFAULT 0.0                   |
| created_at    | DATETIME        | DEFAULT CURRENT_TIMESTAMP     |
| updated_at    | DATETIME        | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

### Events テーブル

| カラム名      | データ型        | 制約                          |
|---------------|-----------------|-------------------------------|
| event_id      | INT             | PRIMARY KEY, AUTO_INCREMENT   |
| title         | VARCHAR(255)    | NOT NULL                      |
| details       | TEXT            |                               |
| start_time    | DATETIME        | NOT NULL                      |
| end_time      | DATETIME        | NOT NULL                      |
| created_at    | DATETIME        | DEFAULT CURRENT_TIMESTAMP     |
| updated_at    | DATETIME        | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

### Bets テーブル

| カラム名      | データ型        | 制約                          |
|---------------|-----------------|-------------------------------|
| bet_id        | INT             | PRIMARY KEY, AUTO_INCREMENT   |
| event_id      | INT             | FOREIGN KEY REFERENCES Events(event_id) |
| choice        | VARCHAR(255)    | NOT NULL                      |
| amount        | FLOAT           | NOT NULL                      |
| user_id       | INT             | FOREIGN KEY REFERENCES Users(student_id) |
| status        | VARCHAR(50)     | DEFAULT 'open'                |
| result        | VARCHAR(50)     | DEFAULT 'pending'             |
| created_at    | DATETIME        | DEFAULT CURRENT_TIMESTAMP     |
| updated_at    | DATETIME        | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

### Products テーブル

| カラム名      | データ型        | 制約                          |
|---------------|-----------------|-------------------------------|
| product_id    | INT             | PRIMARY KEY, AUTO_INCREMENT   |
| name          | VARCHAR(255)    | NOT NULL                      |
| description   | TEXT            |                               |
| price         | FLOAT           | NOT NULL                      |
| stock         | INT             | NOT NULL                      |
| created_at    | DATETIME        | DEFAULT CURRENT_TIMESTAMP     |
| updated_at    | DATETIME        | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

### PurchaseLogs テーブル

| カラム名      | データ型        | 制約                          |
|---------------|-----------------|-------------------------------|
| log_id        | INT             | PRIMARY KEY, AUTO_INCREMENT   |
| product_id    | INT             | FOREIGN KEY REFERENCES Products(product_id) |
| user_id       | INT             | FOREIGN KEY REFERENCES Users(student_id) |
| purchase_time | DATETIME        | DEFAULT CURRENT_TIMESTAMP     |
| quantity      | INT             | NOT NULL                      |
| total_amount  | FLOAT           | NOT NULL                      |
| created_at    | DATETIME        | DEFAULT CURRENT_TIMESTAMP     |
| updated_at    | DATETIME        | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

### Admins テーブル

| カラム名      | データ型        | 制約                          |
|---------------|-----------------|-------------------------------|
| admin_id      | INT             | PRIMARY KEY, AUTO_INCREMENT   |
| password      | VARCHAR(255)    | NOT NULL                      |
| created_at    | DATETIME        | DEFAULT CURRENT_TIMESTAMP     |
| updated_at    | DATETIME        | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |
