import express from 'express';
import pool from './db.js';
import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Admin Login
router.post('/auth/login', (req, res) => {
    const { account, password } = req.body;
    if (password === process.env.ADMIN_PASS) {
        req.session.isAdmin = true; // Set admin privileges
        res.json({ message: 'Login successful', isAdmin: req.session.isAdmin });
    } else {
        res.status(403).json({ error: 'Invalid password' });
    }
});

// Admin Logout
router.post('/auth/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ error: 'Logout failed' });
        res.json({ message: 'Logged out successfully' });
    });
});

// Middleware to check if admin is logged in
const isAdmin = (req, res, next) => {
    if (req.session.isAdmin) {
        next();
    } else {
        res.status(403).json({ error: 'Unauthorized' });
    }
};

// Check if user is admin
router.get('/auth/admin-status', (req, res) => {
    res.json({ isAdmin: req.session.isAdmin || false });
});

export default router;