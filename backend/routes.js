import express from 'express';
import pool from './db.js';
import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.use(session({
    secret: process.env.SESSION_SECRET || 'fallbackSecretKey', // Secure key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Admin Login
router.post('/auth/login', (req, res) => {
    const { account, password } = req.body;
    if (password === process.env.ADMIN_PASS) {
        req.session.isAdmin = true;
        res.json({ message: 'Login successful' });
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

// Attendance stats (public)
router.get('/attendance/stats', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) as total FROM attendance_log');
        const recent = await pool.query('SELECT s.name FROM attendance_log a JOIN attendance s ON a.id = s.id ORDER BY a.timestamp DESC LIMIT 5');
        res.json({ total: result.rows[0].total, recent: recent.rows.map(r => r.name) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Check-in attendance (admin only)
router.post('/attendance/checkin', isAdmin, async (req, res) => {
    const { registrationId } = req.body;
    try {
        const attendance = await pool.query('SELECT * FROM attendance WHERE id = $1', [registrationId]);
        if (attendance.rows.length === 0) return res.status(404).json({ error: 'Registration not found' });
        await pool.query('INSERT INTO attendance_log (id, timestamp) VALUES ($1, NOW())', [registrationId]);
        res.json({ message: 'Checked in successfully', attendance: attendance.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;