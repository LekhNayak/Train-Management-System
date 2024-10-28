const path = require('path');
const fs = require('fs');
const db = require('../db');

// Get division form with zone options
exports.getDivisionForm = (req, res) => {
    const query = 'SELECT id, zone FROM zones';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching zones:', err);
            return res.status(500).send('Server Error');
        }

        // Generate HTML options for zones
        let optionsHtml = results.map(zone => {
            return `<option value="${zone.id}">${zone.zone}</option>`;
        }).join('');

        // Read the HTML file and inject the dynamic options
        fs.readFile(path.join(__dirname, '../client/templates/divisionaddform.html'), 'utf8', (err, html) => {
            if (err) {
                console.error('Error reading HTML file:', err);
                return res.status(500).send('Server Error');
            }

            html = html.replace('<!-- Dynamic options will be injected here -->', optionsHtml);
            res.send(html);
        });
    });
};

// Add a new division
exports.addDivision = (req, res) => {
    const divisionId = req.body.divisionId;
    const divisionName = req.body.divisionName;
    const zoneId = req.body.zone; // Zone ID from select option

    // Check if the division ID already exists
    const checkQuery = 'SELECT * FROM divisions WHERE id = ?';
    db.query(checkQuery, [divisionId], (error, results) => {
        if (error) {
            console.error('Error checking division ID:', error);
            return res.status(500).send('Server Error');
        }

        if (results.length > 0) {
            // Division ID already exists
            return res.status(400).send('Addition failed: Division ID already exists');
        } else {
            // Insert new division
            const insertQuery = 'INSERT INTO divisions (id, division, zone_id) VALUES (?, ?, ?)';
            db.query(insertQuery, [divisionId, divisionName, zoneId], (error, result) => {
                if (error) {
                    console.error('Error adding division:', error);
                    return res.status(500).send('Server Error');
                }
                res.send("Division added successfully.");
            });
        }
    });
};
