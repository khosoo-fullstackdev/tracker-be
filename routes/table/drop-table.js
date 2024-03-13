const { Pool } = require("pg");
const express = require("express");
require("dotenv").config();
const app = express();

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

exports.dropTable = async (req, res) => {
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
};
