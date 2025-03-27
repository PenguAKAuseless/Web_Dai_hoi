import axios from "axios";
import fs from "fs";
import pool from "./db.js";
import csvParser from "csv-parser";

const SHEET_URL = process.env.GOOGLE_SHEETS_CSV_URL;
const FILE_PATH = "./conference_data.csv";

// Maximum number of retries for download and import
const MAX_RETRIES = 3;

async function downloadSheet(retries = MAX_RETRIES) {
    while (retries > 0) {
        try {
            console.log(`Downloading Google Sheet (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})...`);
            const response = await axios.get(SHEET_URL, {
                responseType: "stream",
                timeout: 10000 // 10 seconds timeout
            });

            const writer = fs.createWriteStream(FILE_PATH);
            response.data.pipe(writer);

            return new Promise((resolve, reject) => {
                writer.on("finish", () => {
                    console.log("File downloaded successfully:", FILE_PATH);
                    resolve();
                });
                writer.on("error", reject);
            });
        } catch (error) {
            retries--;
            console.error(`Download error (${MAX_RETRIES - retries}/${MAX_RETRIES}):`, error.message);

            if (retries === 0) {
                console.error("Failed to download sheet after maximum retries.");
                throw error;
            }

            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
}

async function importData() {
    try {
        console.log("Importing CSV into database...");
        const csvStream = fs.createReadStream(FILE_PATH).pipe(csvParser());
        const results = [];

        await new Promise((resolve, reject) => {
            csvStream
                .on("data", (row) => results.push(row))
                .on("end", resolve)
                .on("error", reject);
        });

        console.log(`Processed ${results.length} rows.`);

        const client = await pool.connect();

        try {
            // Start a transaction
            await client.query('BEGIN');

            await client.query(`
                CREATE TABLE IF NOT EXISTS conference (
                delegate_id VARCHAR(7) PRIMARY KEY,
                name TEXT NOT NULL,
                type BOOLEAN NOT NULL,
                gender BOOLEAN NOT NULL,
                ethnic TEXT NOT NULL,
                dang_vien BOOLEAN NOT NULL,
                hoi_vien BOOLEAN NOT NULL,
                image TEXT NOT NULL
                );
            `);

            await client.query('TRUNCATE TABLE conference CASCADE;');

            let successCount = 0;
            let skipCount = 0;

            for (const row of results) {
                const delegateId = row["MSCB_MSSV"];
                const name = row["Name"];
                const type = row["Type"] === "Đương nhiên";
                const gender = row["Gender"] === "Nữ";
                const ethnic = row["Ethnic"];
                const dangVien = row["Dang_vien"] === "TRUE";
                const hoiVien = row["Hoi_vien"] == "TRUE";
                const image = row["Image"];

                if (!delegateId || !name || !ethnic || !image) {
                    console.log(`Skipping invalid row: ${JSON.stringify(row)}`);
                    skipCount++;
                    continue;
                }

                const checkExist = await client.query(
                    "SELECT delegate_id FROM conference WHERE delegate_id = $1",
                    [delegateId]
                );

                if (checkExist.rows.length > 0) {
                    console.log(`Skipping existing delegate: ${delegateId}`);
                    skipCount++;
                    continue;
                }

                await client.query(
                    "INSERT INTO conference (delegate_id, name, type, gender, ethnic, dang_vien, hoi_vien, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
                    [delegateId, name, type, gender, ethnic, dangVien, hoiVien, image]
                );

                successCount++;
                console.log(`Added delegate: ${delegateId} - ${name}`);
            }

            // Commit the transaction
            await client.query('COMMIT');

            console.log(`Import completed! Successful: ${successCount}, Skipped: ${skipCount}`);
        } catch (err) {
            // Rollback the transaction in case of error
            await client.query('ROLLBACK');
            console.error("Error inserting data:", err);
            throw err;
        } finally {
            // Release the client back to the pool
            client.release();
        }
    } catch (error) {
        console.error("Error importing data:", error.message);
        throw error;
    }
}

const initializeConferenceData = async () => {
    try {
        await downloadSheet();
        await importData();
    } catch (error) {
        console.error("Conference data initialization failed:", error);
        throw error;
    }
};

export default initializeConferenceData;