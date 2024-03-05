import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  ssl: true,
});

export default async function handler(req, res) {
  const client = await pool.connect();

  try {
    const response = await client.query("SELECT version()");

    console.log(response.rows[0]);

    res.status(200).json({
      data: response.rows[0],
    });
  } finally {
    client.release();
  }
}
