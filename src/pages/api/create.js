import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  ssl: true,
});

export default async function handler(req, res) {
  const client = await pool.connect();

  try {
    const response = await client.query(
      "CREATE TABLE users (ID int NOT NULL, email VARCHAR(50) UNIQUE NOT NULL, name VARCHAR(50) NOT NULL, password text, avatar_img varchar, createdAt TIMESTAMP,updatedAt TIMESTAMP, currency_type TEXT DEFAULT 'MNT');"
    );
    res.status(200).json();
  } finally {
    client.release();
  }
}
