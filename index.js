const { Pool } = require("pg");
// const express = require("express");
require("dotenv").config();

// const app = express();

// const bodyParser = require("body-parser");
// app.use(bodyParser.json());

// const cors = require("cors");
// app.use(cors());

// const fs = require("fs");
// const { error } = require("console");

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

// app.post("/signup", async (req, res) => {
//   const newUser = req.body;

//   console.log(newUser);

//   const client = await pool.connect();
//   const Query = `INSERT INTO users (name, email, password, id) VALUES ('${newUser.name}','${newUser.email}','${newUser.password}','${newUser.id}');`;
//   try {
//     client.query(Query);
//   } catch (e) {
//     console.log(e);
//   } finally {
//     client.release();
//     console.log("user add successfully");
//   }

//   res.status(200).send({ message: "User Added successfully" });
// });

// app.post("/login", async (req, res) => {
//   const user = req.body;
//   console.log(user);
//   const client = await pool.connect();
//   const Query = `SELECT * FROM users WHERE (email='${user.email}' AND password='${user.password}');`;

//   try {
//     const dbResponse = await client.query(Query);
//     if (dbResponse["rowCount"]) {
//       return res.status(200).send({ success: "true" });
//     } else {
//       return res.status(500).send({ success: "false" });
//     }
//   } catch (e) {
//     console.log(e);
//   } finally {
//     client.release();
//     console.log();
//   }
// });
async function getPgVersion() {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "ALTER TABLE category RENAME COLUMN nmae to name;"
    );
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
}
getPgVersion();

// app.listen(4000, () => {
//   console.log("Server is listening on port 4000");
// });
