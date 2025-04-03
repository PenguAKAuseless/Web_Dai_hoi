import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const isLocal = process.env.LOCAL == "true";

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

// Error handling for pool
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Reset all tables
async function initDB() {
  try {
    await pool.query(`
      DROP TABLE IF EXISTS conference, attendance_log;
      CREATE TABLE IF NOT EXISTS conference (
        delegate_id VARCHAR(7) PRIMARY KEY,
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
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}

export default pool;