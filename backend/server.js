import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import routes from './routes.js';

dotenv.config();
const app = express();

// CORS Configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());

// Express Session (Default In-Memory Store)
app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultSecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production", // Enable for HTTPS
        httpOnly: true,
        sameSite: "None"
    }
}));

// Routes
app.use('/api', routes);

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));