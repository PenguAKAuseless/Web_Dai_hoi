import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const isLocal = process.env.LOCAL;

// Local pool and production pool handle
const pool = new Pool(
  isLocal
    ? {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASS,
      port: parseInt(process.env.DB_PORT, 10), 
    }
    : {
      connectionString: process.env.DATABASE_URL || process.env.DB_EXTERNAL_URL,
      ssl: { rejectUnauthorized: false }
    }
);

// Creates tables if they don't exist
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