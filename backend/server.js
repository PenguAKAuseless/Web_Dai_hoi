import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import { createServer } from 'http';
import initializeConferenceData from './importConference.js'; // Import the new function
import setupWebSocket from './wsroutes.js';

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

// Create HTTP server
const server = createServer(app);

(async () => {
    await initializeConferenceData(); // Ensure conference data is loaded before WebSocket starts

    // Setup WebSocket server
    setupWebSocket(server);

    // Start Server
    const PORT = process.env.PORT || 8000;
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();