const { Pool } = require("pg");

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: PGPORT,
  ssl: {
    require: true,
  },
  keepAlive: true,
});

async function addUser(userInfo) {
  let response;
  const client = await pool.connect();
  const Query = `INSERT INTO users (name, email, password, id) VALUES ('${userInfo.name}', '${userInfo.email}', '${userInfo.password}', '${userInfo.id}');`;
  try {
    response = await client.query(Query);
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
  if (response == null) {
    return "false";
  } else {
    console.log("user added succesfully");
    return "true";
  }
}

async function getUser(userInfo) {
  let response;
  const client = await pool.connect();
  const Query = `SELECT * FROM users WHERE (email='${userInfo.email}' AND password='${userInfo.password}');`;

  try {
    response = await client.query(Query);
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
  if (response == null) {
    return "false";
  } else {
    return "true";
  }
}

async function currencySelect(userInfo) {
  const client = await pool.connect();
  const Query = `UPDATE users SET currency_type='${userInfo.currency}' WHERE (id='${userInfo.id}');`;
  try {
    const response = await client.query(Query);
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
  return response;
}

async function balanceSet(userInfo) {
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
}
module.exports = {
  addUser,
  getUser,
  currencySelect,
  balanceSet,
};
