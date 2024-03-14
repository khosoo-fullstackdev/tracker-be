// const { Pool } = require("pg");
// const express = require("express");
// const app = express();
// const { v4: uuidv4 } = require("uuid");

// require("dotenv").config();
// let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;
// const pool = new Pool({
//   host: PGHOST,
//   database: PGDATABASE,
//   username: PGUSER,
//   password: PGPASSWORD,
//   port: PGPORT,
//   ssl: {
//     require: true,
//   },
// });

// exports.createTable = async (req, res) => {
//   const client = await pool.connect();
//   // "CREATE TABLE transaction (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), user_id UUID, FOREIGN KEY(user_id) REFERENCES users(id), description TEXT, amount REAL NOT NULL, transaction ENUM(“INC”, ”EXP”), createdAt TIMESTAMP DEFAULT: NOW() , updatedAt TIMESTAMP DEFAULT: NOW(), category_id UUID FOREIGN KEY(category_id) REFERENCES category(id)";
//   // "CREATE TABLE users ( id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), email VARCHAR(50) UNIQUE NOT NULL, name VARCHAR(50) NOT NULL , password TEXT, avatar_img TEXT, createdAt TIMESTAMP, updatedAt TIMESTAMP, currencyType TEXT DEFAULT'MNT');";
//   // "CREATE TABLE category ( id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), name VARCHAR(100) NOT NULL , description TEXT, createdAt TIMESTAMP, updatedAt TIMESTAMP, category_image TEXT";
//   const Query =
//     "CREATE TABLE transaction (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID ,FOREIGN KEY (user_id) REFERENCES users(id), description TEXT, amount REAL NOT NULL, transaction_type VARCHAR(50), createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, category_id UUID ,FOREIGN KEY(category_id) REFERENCES category(id))";
//   try {
//     client.query(Query);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     client.release();
//     res.status(200).send({ message: "table created" });
//   }
// };

// exports.dropTable = async (req, res) => {
//   const client = await pool.connect();
//   const Query = "DROP TABLE category";
//   try {
//     client.query(Query);
//   } catch (e) {
//     console.log(e);
//   } finally {
//     client.release();
//     res.status(200).send({ message: "table deleted" });
//   }
// };

// exports.updateTable = async (req, res) => {
//   const client = await pool.connect();
//   const Query = "ALTER TABLE users ADD balance INT(255) DEFAULT 0;";
//   try {
//     client.query(Query);
//   } catch (e) {
//     console.log(e);
//   } finally {
//     client.release();
//     res.status(200).send({ message: "table updated" });
//   }
// };
