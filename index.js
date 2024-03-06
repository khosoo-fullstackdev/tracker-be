const { Pool } = require("pg");
const express = require("express");
// const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(express());
// app.use(cors());

require("dotenv").config();
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    require: true,
  },
});

app.get("/users", async (req, res) => {
  const client = await pool.connect();
  const Query = "";
  try {
    const response = await client.query(Query);
    res.status(200).json();
  } finally {
    client.release();
  }
});

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
//async function getPgVersion() {
//const client = await pool.connect();
//try {
//   const result = await client.query(
//     "INSERT INTO users (ID, email, name, password, currency_type) VALUES ('2323', 'gggg@gmail.com', 'Dorj', 'Dorj33', 'USD')"
//   );
//   console.log(result.rows[0]);
// } finally {
//   client.release();
// }
//}
//  getPgVersion();

//   "INSERT INTO users (ID, email, name, password, currency_type) VALUES ('2323', 'gggg@gmail.com', 'Dorj', 'Dorj33', 'USD')"
