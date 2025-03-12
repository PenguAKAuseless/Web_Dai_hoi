import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'ioredis';
import routes from './routes.js';

dotenv.config();
const app = express();

// CORS Configuration for Render
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true, // Required for cookies/session
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());

// Create Redis Client with Improved Error Handling
const redisClient = createClient({
    url: process.env.REDIS_URL,
    socket: {
        reconnectStrategy: retries => Math.min(retries * 50, 1000), // Retry up to 1000ms
    }
});

redisClient.on("error", (err) => {
    console.error("⚠️ Redis connection error:", err);
});

redisClient.connect().catch((err) => console.error("🚨 Failed to connect to Redis:", err.message));

// Redis Session Store
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET || 'defaultSecret', // Secure in .env
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production", // true for HTTPS
        httpOnly: true,
        sameSite: "None"
    }
}));

// Routes
app.use('/api', routes);

// Use Render's Assigned Port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));