import { Pool } from "pg";

export const pool = new Pool({
  user: process.env.USER_NAME,
  host: process.env.HOST_NAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_NUMBER,
});

export default async function dbConnect() {
  await pool.connect((err, client, release) => {
    if (err) {
      return console.error("Error acquiring client", err.stack);
    }
    client.query("SELECT NOW()", (err, result) => {
      release();
      if (err) {
        return console.error("Error executing query", err.stack);
      }
      console.log("Connected to Database.", result.rows);
    });
  });
}
