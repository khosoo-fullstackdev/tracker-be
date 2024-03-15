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
  let response;
  const client = await pool.connect();
  const Query = `UPDATE users SET currencytype='${userInfo.currency}' WHERE id='${userInfo.userid}';`;
  try {
    response = await client.query(Query);
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
  return response;
}

async function balanceSet(userInfo) {
  let response;
  const client = await pool.connect();
  const Query = `UPDATE users SET balance='${userInfo.balance}' WHERE id='${userInfo.userid}';`;
  try {
    response = await client.query(Query);
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
  console.log("balance added succesfully");
  return response;
}
module.exports = {
  addUser,
  getUser,
  currencySelect,
  balanceSet,
};
