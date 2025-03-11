import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session'; // Import session
import pool from './db.js';
import routes from './routes.js';

dotenv.config();
const app = express();

// CORS Configuration
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, // Required for cookies/session
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());

// Session Middleware (Required for `req.session`)
app.use(session({
    secret: 'yourSecretKey',  // Change this to a secure secret
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true } // secure: true only for HTTPS
}));

// Ensure routes exist
app.use('/api', routes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
