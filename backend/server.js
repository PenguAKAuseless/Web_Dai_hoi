import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import routes from './routes.js';
import { exec } from 'child_process';

dotenv.config();
const app = express();

// Allowed CORS Origins (Frontend URLs)
const allowedOrigins = [
    "http://localhost:5173",
    "https://web-dai-hoi.web.app"
];

// CORS Configuration
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

// Middleware
app.use(express.json());

// Express Session Configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultSecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production", // Only secure cookies in production
        httpOnly: true,
        sameSite: "Lax"
    }
}));

// Routes
app.use('/api', routes);

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));