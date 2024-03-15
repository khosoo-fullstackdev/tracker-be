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

async function getCategory() {
  let response;
  const client = await pool.connect();
  const Query = "SELECT * FROM category";
  try {
    response = await client.query(Query);
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
    return response.rows;
  }
}
async function addCategory(category) {
  let response;
  const client = await pool.connect();
  const Query = `INSERT INTO category (name, description, category_image) VALUES ('${category.name}', '${category.description}', '${category.icon}');`;
  try {
    response = await client.query(Query);
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
    return { message: "category added" };
  }
}

module.exports = { getCategory, addCategory };
