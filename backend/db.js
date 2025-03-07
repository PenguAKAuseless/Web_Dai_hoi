import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly specify the path to the .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: parseInt(process.env.DB_PORT, 10), // Convert port to number
});

// Ensure table exists
async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS conference (
      delegate_id VARCHAR(20) PRIMARY KEY,
      name TEXT NOT NULL,
      image TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS attendance_log (
      log_id SERIAL PRIMARY KEY,
      delegate_id VARCHAR(20) REFERENCES conference(delegate_id),
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log('Database initialized.');
}

initDB();

export default pool;