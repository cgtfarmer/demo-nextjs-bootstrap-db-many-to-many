-- Setup DB

DROP DATABASE IF EXISTS myDatabase;

CREATE DATABASE myDatabase;

USE myDatabase;

DROP TABLE IF EXISTS stores;

DROP TABLE IF EXISTS products;

DROP TABLE IF EXISTS storeProducts;

CREATE TABLE stores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  logoUrl VARCHAR(511)
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  weight FLOAT,
  color VARCHAR(255),
  imageUrl VARCHAR(511)
);

CREATE TABLE storeProducts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  storeId INT,
  productId INT,
  quantity INT,
  price FLOAT,
  FOREIGN KEY (storeId) REFERENCES stores(id),
  FOREIGN KEY (productId) REFERENCES products(id)
);


-- -------------------------------------------
-- Seed DB
-- -------------------------------------------

-- Stores
-- -------------------------------------------

INSERT INTO stores (name, logoUrl)
VALUES ('Walmart', '/walmart-logo.png');

INSERT INTO stores (name, logoUrl)
VALUES ('Target', '/target-logo.png');

INSERT INTO stores (name, logoUrl)
VALUES ('Best Buy', '/best-buy-logo.jpeg');


-- Products
-- -------------------------------------------

INSERT INTO products (name, weight, color, imageUrl)
VALUES ('Apple', 0.5, 'red', '/apple.png');

INSERT INTO products (name, weight, color, imageUrl)
VALUES ('Chainsaw', 23.7, 'green', '/chainsaw.webp');

INSERT INTO products (name, weight, color, imageUrl)
VALUES ('Hotwheels Car', 0.1, 'black', '/hotwheels-car.jpeg');

INSERT INTO products (name, weight, color, imageUrl)
VALUES ('Toaster', 6.0, 'silver', '/toaster.jpeg');

INSERT INTO products (name, weight, color, imageUrl)
VALUES ('T-Shirt', 0.3, 'white', '/tshirt.jpeg');


-- Store Products
-- -------------------------------------------

-- Walmart

INSERT INTO storeProducts (storeId, productId, quantity, price)
VALUES (1, 1, 100, 0.88);

INSERT INTO storeProducts (storeId, productId, quantity, price)
VALUES (1, 2, 12, 174.99);

INSERT INTO storeProducts (storeId, productId, quantity, price)
VALUES (1, 3, 46, 1.34);

INSERT INTO storeProducts (storeId, productId, quantity, price)
VALUES (1, 4, 14, 34.99);

INSERT INTO storeProducts (storeId, productId, quantity, price)
VALUES (1, 5, 162, 14.49);

-- Target

INSERT INTO storeProducts (storeId, productId, quantity, price)
VALUES (2, 1, 23, 1.18);

INSERT INTO storeProducts (storeId, productId, quantity, price)
VALUES (2, 3, 31, 1.87);

INSERT INTO storeProducts (storeId, productId, quantity, price)
VALUES (2, 4, 24, 43.49);

INSERT INTO storeProducts (storeId, productId, quantity, price)
VALUES (2, 5, 85, 18.67);

-- Best Buy

INSERT INTO storeProducts (storeId, productId, quantity, price)
VALUES (3, 3, 17, 2.32);

INSERT INTO storeProducts (storeId, productId, quantity, price)
VALUES (3, 4, 15, 41.27);
