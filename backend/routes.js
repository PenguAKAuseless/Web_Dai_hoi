import express from 'express';
import pool from './db.js';

const router = express.Router();

let isAdminLoggedIn = false;

// Admin Login
router.post('/auth/login', (req, res) => {
    const { password } = req.body;
    if (password === process.env.ADMIN_PASS) {
        isAdminLoggedIn = true;
        res.json({ message: 'Login successful' });
    } else {
        res.status(403).json({ error: 'Invalid password' });
    }
});

// Admin Logout
router.post('/auth/logout', (req, res) => {
    isAdminLoggedIn = false;
    res.json({ message: 'Logged out successfully' });
});

// Get attendance statistics
router.get('/attendance/stats', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) as total FROM attendance_log');
        const recent = await pool.query('SELECT s.name FROM attendance_log a JOIN attendance s ON a.id = s.id ORDER BY a.timestamp DESC LIMIT 5');
        res.json({ total: result.rows[0].total, recent: recent.rows.map(r => r.name) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Check-in attendance
router.post('/attendance/checkin', async (req, res) => {
    if (!isAdminLoggedIn) return res.status(403).json({ error: 'Unauthorized' });

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