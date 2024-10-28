const path = require('path');
const fs = require('fs');
const db = require('../db');

exports.getZoneForm = (req, res) => {
    fs.readFile(path.join(__dirname, '../client/templates/zoneaddform.html'), 'utf8', (err, html) => {
        if (err) {
            console.error('Error reading HTML file:', err);
            return res.status(500).send('Server Error');
        }
        res.send(html);
    });
};

exports.addZone = (req, res) => {
    var id = req.body.zoneId;
    var zone = req.body.zoneName;
    var hq = req.body.hq;

    // Check if the zone ID already exists
    const checkQuery = 'SELECT * FROM zones WHERE id = ?';
    db.query(checkQuery, [id], (error, results) => {
        if (error) {
            console.error('Error checking zone ID:', error);
            return res.status(500).send('Server Error');
        }
        
        if (results.length > 0) {
            // Zone ID already exists
            return res.status(400).send('Addition failed: Zone ID already exists');
        } else {
            // Insert new zone
            const insertQuery = 'INSERT INTO zones (id, zone, headquarters) VALUES (?, ?, ?)';
            db.query(insertQuery, [id, zone, hq], (error, result) => {
                if (error) {
                    console.error('Error adding zone:', error);
                    return res.status(500).send('Server Error');
                }
                res.send("Zone added successfully.");
            });
        }
    });
};



