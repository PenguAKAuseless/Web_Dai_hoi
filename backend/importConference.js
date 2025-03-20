import axios from "axios";
import fs from "fs";
import pool from "./db.js";
import csvParser from "csv-parser";

const SHEET_URL = process.env.GOOGLE_SHEETS_CSV_URL;

// Local file path
const FILE_PATH = "./conference_data.csv";

async function downloadSheet() {
    try {
        console.log("Downloading Google Sheet...");
        const response = await axios.get(SHEET_URL, { responseType: "stream" });

        // Save CSV file locally
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
        console.error("Error downloading sheet:", error.message);
        throw error;
    }
}

// Function to import CSV into database
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
            await client.query(`
                CREATE TABLE IF NOT EXISTS conference (
                delegate_id VARCHAR(20) PRIMARY KEY,
                name TEXT NOT NULL,
                image TEXT NOT NULL
                )
            `);

            await client.query('TRUNCATE TABLE conference CASCADE;');

            for (const row of results) {
                const delegateId = row["MSCB_MSSV"];
                const name = row["Name"];
                const image = row["Image"];

                if (!delegateId || !name || !image) {
                    console.log(`Skipping invalid row: ${JSON.stringify(row)}`);
                    continue;
                }

                const checkExist = await client.query(
                    "SELECT delegate_id FROM conference WHERE delegate_id = $1",
                    [delegateId]
                );

                if (checkExist.rows.length > 0) {
                    console.log(`Skipping existing delegate: ${delegateId}`);
                    continue;
                }

                await client.query(
                    "INSERT INTO conference (delegate_id, name, image) VALUES ($1, $2, $3)",
                    [delegateId, name, image]
                );
                console.log(`Added delegate: ${delegateId} - ${name}`);
            }
            console.log("Import completed!");
            const id = '2312153';
            console.log(await client.query("SELECT * FROM conference WHERE delegate_id = $1", [id]));
        } catch (err) {
            console.error("Error inserting data:", err);
        } finally {
            client.release();
        }
    } catch (error) {
        console.error("Error importing data:", error.message);
    }
}

// Run the process
(async () => {
    await downloadSheet();
    await importData();
})();