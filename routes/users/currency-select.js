const { Pool } = require("pg");

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

exports.currency = async (req, res) => {
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
};
