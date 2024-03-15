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

async function cateAdd() {
  let response;
  const client = await pool.connect();
  const Query =
    "CREATE TABLE users ( id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), email VARCHAR(50) UNIQUE NOT NULL, name VARCHAR(50) NOT NULL , password TEXT, avatar_img TEXT, createdAt TIMESTAMP, updatedAt TIMESTAMP, currencyType TEXT DEFAULT'MNT', balance VARCHAR(255) DEFAULT 0);";
  try {
    response = await client.query(Query);
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
    return { message: "table created" };
  }
  // "CREATE TABLE transaction (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), user_id UUID, FOREIGN KEY(user_id) REFERENCES users(id), description TEXT, amount REAL NOT NULL, transaction ENUM(“INC”, ”EXP”), createdAt TIMESTAMP DEFAULT: NOW() , updatedAt TIMESTAMP DEFAULT: NOW(), category_id UUID FOREIGN KEY(category_id) REFERENCES category(id)";
  // "CREATE TABLE users ( id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), email VARCHAR(50) UNIQUE NOT NULL, name VARCHAR(50) NOT NULL , password TEXT, avatar_img TEXT, createdAt TIMESTAMP, updatedAt TIMESTAMP, currencyType TEXT DEFAULT'MNT', balance VARCHAR(255) DEFAULT 0);";
  // "CREATE TABLE category ( id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), name VARCHAR(100) NOT NULL , description TEXT, createdAt TIMESTAMP, updatedAt TIMESTAMP, category_image TEXT";
}

module.exports = { cateAdd };
