import express from 'express';
import pool from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Admin Login
router.post('/auth/login', (req, res) => {
    const { account, password } = req.body;
    if (password === process.env.ADMIN_PASS) {
        req.session.isAdmin = true;
        req.session.save(err => {
            if (err) {
                return res.status(500).json({ error: "Failed to save session." });
            }
            res.json({ message: 'Login successful' });
        });
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
    console.log(req.session)
    res.json({ isAdmin: req.session.isAdmin || false });
});

// Attendance stats (public)
router.get('/attendance/stats', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) as total FROM conference');
        res.json({ total: parseInt(result.rows[0].total) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get delegate info if they exist in conference
router.get('/conference/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Check if delegate exists in the conference table
        const result = await pool.query('SELECT * FROM conference WHERE delegate_id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Delegate not found' });
        }

        // Check attendance status
        const attendanceResult = await pool.query(
            'SELECT COUNT(*) as checkins FROM attendance_log WHERE delegate_id = $1',
            [id]
        );

        // Return delegate info along with attendance check-in count
        res.json({
            delegate: result.rows[0],
            checkins: parseInt(attendanceResult.rows[0].checkins) // Number of times checked in
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Check-in attendance (admin only)
router.post('/attendance/checkin', isAdmin, async (req, res) => {
    const { registrationId } = req.body;
    try {
        const delegate = await pool.query('SELECT * FROM conference WHERE delegate_id = $1', [registrationId]);
        if (delegate.rows.length === 0) {
            return res.status(404).json({ error: 'Delegate not found' });
        }

        // Insert into attendance_log
        await pool.query('INSERT INTO attendance_log (delegate_id, timestamp) VALUES ($1, NOW())', [registrationId]);

        res.json({ message: 'Checked in successfully', delegate: delegate.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;