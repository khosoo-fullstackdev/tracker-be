const { Pool } = require("pg");
const express = require("express");
require("dotenv").config();

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

const fs = require("fs");
const { error } = require("console");

const { v4: uuidv4 } = require("uuid");

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;
const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: PGPORT,
  ssl: {
    require: true,
  },
});

app.post("/signup", async (req, res) => {
  const newUser = req.body;

  console.log(newUser);

  const client = await pool.connect();
  const Query = `INSERT INTO users (name, email, password, id) VALUES ('${newUser.name}','${newUser.email}','${newUser.password}','${newUser.id}');`;
  try {
    client.query(Query);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
    console.log("user add successfully");
  }

  res.status(200).send({ message: "User Added successfully" });
});

app.post("/login", async (req, res) => {
  const user = req.body;
  console.log(user);
  const client = await pool.connect();
  const Query = `SELECT * FROM users WHERE (email='${user.email}' AND password='${user.password}');`;

  try {
    const dbResponse = await client.query(Query);
    if (dbResponse["rowCount"]) {
      return res.status(200).send({ success: "true" });
    } else {
      return res.status(500).send({ success: "false" });
    }
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
    console.log();
  }
});

app.post("/createTable", async (req, res) => {
  const client = await pool.connect();
  // "CREATE TABLE transaction (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), user_id UUID, FOREIGN KEY(user_id) REFERENCES users(id), description TEXT, amount REAL NOT NULL, transaction ENUM(“INC”, ”EXP”), createdAt TIMESTAMP DEFAULT: NOW() , updatedAt TIMESTAMP DEFAULT: NOW(), category_id UUID FOREIGN KEY(category_id) REFERENCES category(id)";
  // "CREATE TABLE users ( id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), email VARCHAR(50) UNIQUE NOT NULL, name VARCHAR(50) NOT NULL , password TEXT, avatar_img TEXT, createdAt TIMESTAMP, updatedAt TIMESTAMP, currencyType TEXT DEFAULT'MNT');";
  // "CREATE TABLE category ( id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), name VARCHAR(100) NOT NULL , description TEXT, createdAt TIMESTAMP, updatedAt TIMESTAMP, category_image TEXT";
  const Query =
    "CREATE TABLE transaction (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID ,FOREIGN KEY (user_id) REFERENCES users(id), description TEXT, amount REAL NOT NULL, transaction_type VARCHAR(50), createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, category_id UUID ,FOREIGN KEY(category_id) REFERENCES category(id))";
  try {
    client.query(Query);
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
    res.status(200).send({ message: "table created" });
  }
});

app.post("/updateTable", async (req, res) => {
  const client = await pool.connect();
  const Query = "CREATE TABLE transaction id VARCHAR(36), )";
  try {
    client.query(Query);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
    res.status(200).send({ message: "table updated" });
  }
});

app.post("/dropTable", async (req, res) => {
  const client = await pool.connect();
  const Query = "DROP TABLE category";
  try {
    client.query(Query);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
    res.status(200).send({ message: "table deleted" });
  }
});

// app.post("/deleteUser", async (req, res) => {
//   const client = await pool.connect();
//   const Query = "CREATE TABLE transaction id VARCHAR(36), )";
//   try {
//     client.query(Query);
//   } catch (e) {
//     console.log(e);
//   } finally {
//     client.release();
//     res.status(200).send({ message: "user add successfully" });
//   }
// });

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
