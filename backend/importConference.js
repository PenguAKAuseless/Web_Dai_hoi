import axios from 'axios';
import pool from './db.js';
import csvParser from 'csv-parser';
import { Readable } from 'stream';

// Google Sheets CSV URL (Replace `gid` if using a different sheet)
const SHEET_URL = process.env.GOOGLE_SHEETS_CSV_URL || "https://docs.google.com/spreadsheets/d/1WpizSAh5iUkjF32k8KvMVMC4Qfie5lPt/gviz/tq?tqx=out:csv&gid=286016700";

// Function to fetch and parse CSV from Google Sheets
async function fetchAndImportData() {
    try {
        console.log("📥 Fetching conference data from Google Sheets...");
        const response = await axios.get(SHEET_URL);

        if (!response.data) {
            throw new Error("❌ No data received from Google Sheets.");
        }

        // Convert CSV string to stream
        const csvStream = Readable.from(response.data);
        const results = [];

        await new Promise((resolve, reject) => {
            csvStream
                .pipe(csvParser())
                .on("data", (row) => {
                    results.push(row);
                })
                .on("end", resolve)
                .on("error", reject);
        });

        console.log("✅ Data fetched successfully. Processing entries...");

        const client = await pool.connect();
        try {
            await client.query(`
                CREATE TABLE IF NOT EXISTS conference (
                    delegate_id VARCHAR(255) PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    image TEXT NOT NULL
                )
            `);

            for (const row of results) {
                const delegateId = row["ID"];
                const name = row["Name"];
                const image = row["Image"];

                if (!delegateId || !name || !image) {
                    console.log(`⚠️ Skipping invalid row: ${JSON.stringify(row)}`);
                    continue;
                }

                // Check if delegate already exists
                const checkExist = await client.query("SELECT delegate_id FROM conference WHERE delegate_id = $1", [delegateId]);
                if (checkExist.rows.length > 0) {
                    console.log(`🔄 Skipping existing delegate: ${delegateId}`);
                    continue;
                }

                // Insert new delegate
                await client.query(
                    "INSERT INTO conference (delegate_id, name, image) VALUES ($1, $2, $3)",
                    [delegateId, name, image]
                );
                console.log(`✅ Added delegate: ${delegateId} - ${name}`);
            }

            console.log("🎉 Import completed!");
        } catch (err) {
            console.error("❌ Error inserting data:", err);
        } finally {
            client.release();
        }
    } catch (error) {
        console.error("❌ Error fetching data:", error.message);
    }
}

// Run the import
fetchAndImportData();