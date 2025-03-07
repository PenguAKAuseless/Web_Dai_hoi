import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';
import routes from './routes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Use routes
app.use('/api', routes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));