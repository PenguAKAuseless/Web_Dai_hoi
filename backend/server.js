import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
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

// Session Middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultSecret',  // Secure in .env
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production", // true in production (HTTPS)
        httpOnly: true,
        sameSite: "None" // Required for cross-origin cookies
    }
}));

// Routes
app.use('/api', routes);

// Use Render's Assigned Port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));