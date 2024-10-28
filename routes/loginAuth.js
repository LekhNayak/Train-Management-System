const express = require('express');
const router = express.Router();
const db = require('../db'); 

router.post('/', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ? AND password = ?'; // Make sure to hash passwords in production

    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        if (results.length > 0) {
            return res.json({ success: true });
        } else {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    });
});

// Export the router
module.exports = router;
