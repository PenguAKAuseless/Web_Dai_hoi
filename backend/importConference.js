import path from 'path';
import { fileURLToPath } from 'url';
import exceljs from 'exceljs';
import pool from './db.js';
import fs from 'fs';

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the Excel file (Update if needed)
const FILE_PATH = process.env.CONFERENCE_FILE_PATH || path.join(__dirname, 'conference.xlsx');

if (!fs.existsSync(FILE_PATH)) {
    console.error(`🚨 Error: Excel file not found at ${FILE_PATH}`);
    process.exit(1);
}

async function createTableIfNotExists(client) {
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS conference (
                delegate_id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image TEXT NOT NULL
            )
        `);
    } catch (err) {
        console.error('Error creating table:', err);
        process.exit(1);
    }
}

async function importConference() {
    const client = await pool.connect(); // Get a client from the pool
    try {
        // Ensure the table exists
        await createTableIfNotExists(client);

        // Read the Excel file
        const workbook = new exceljs.Workbook();
        await workbook.xlsx.readFile(FILE_PATH);
        const worksheet = workbook.worksheets[0];

        console.log('Importing attendance from Excel...');

        for (let rowIndex = 2; rowIndex <= worksheet.rowCount; rowIndex++) {
            const row = worksheet.getRow(rowIndex);
            const MSCB_MSSV = row.getCell(1).value; // Delegate ID
            const Name = row.getCell(2).value; // Delegate Name
            const Image = row.getCell(3).value; // Image URL

            if (!MSCB_MSSV || !Name || !Image) {
                console.log(`Skipping invalid row ${rowIndex}: ${MSCB_MSSV}, ${Name}, ${Image}`);
                continue;
            }

            // Check if the delegate already exists
            const checkExist = await client.query('SELECT delegate_id FROM conference WHERE delegate_id = $1', [MSCB_MSSV]);
            if (checkExist.rows.length > 0) {
                console.log(`Skipping existing registration: ${MSCB_MSSV}`);
                continue;
            }

            // Insert delegate into conference
            await client.query(
                'INSERT INTO conference (delegate_id, name, image) VALUES ($1, $2, $3)',
                [MSCB_MSSV, Name, Image]
            );
            console.log(`Added delegate: ${MSCB_MSSV} - ${Name}`);
        }

        console.log('Delegates import completed.');
    } catch (err) {
        console.error('Error importing conference:', err);
    } finally {
        client.release(); // Release the client back to the pool
        process.exit();
    }
}

importConference();