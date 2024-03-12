const express = require("express");
require("dotenv").config();
const router = express.Router();

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

const fs = require("fs");
const { error, table } = require("console");

const { createTable } = require("./route/table/create-table");
const { updateTable } = require("./route/table/update-table");
const { dropTable } = require("./route/table/drop-table");

app.use(router);

router.post("/create-table", createTable);
router.post("/update-table", updateTable);
router.post("/drop-table", dropTable);

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

app.post("/currency", async (req, res) => {
  const balance = req.body;

  const client = await pool.connect();
  const Query = `INSERT INTO users () VALUES ());`;
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

app.post("/balance", async (req, res) => {
  const balance = req.body;

  const client = await pool.connect();
  const Query = `INSERT INTO users () VALUES ());`;
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
