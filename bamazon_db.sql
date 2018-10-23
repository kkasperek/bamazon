-- setup bamazon_db in MySQL
DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;
USE bamazon_db;

-- Creates the table "products" and its columns --
CREATE TABLE products (
  item_id INTEGER AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(255),
  department_name VARCHAR(255),
  price INTEGER NOT NULL,
  stock_quantity INTEGER,
  
  -- Set primary key --
  PRIMARY KEY (item_id)
);

-- Insert 10 rows (values) into the tables columns --
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('2019 Azimut S7 Coupe', 'Yachts', 1795500, 1);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('2014 Sea Ray 510 Sundancer', 'Yachts', 782250, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('2016 Azimut Motoryacht', 'Yachts', 3950000, 1);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('2013 Azimut', 'Yachts', 1299000, 1);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('2013 Sea Ray 370 Venture', 'Boats', 253360, 3);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('2014 MasterCraft X-30', 'Boats', 79995, 4);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('2012 Malibu VTX', 'Boats', 51995, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Boardworks Kraken Stand Up Paddle Board ', 'WaterSports', 1395, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Boardworks Solr Stand Up Paddle Board', 'WaterSports', 895, 7);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Mad River Adventure 14 Canoe', 'Canoes', 769, 12);

-- Select all values in the table --
SELECT * FROM products; 
