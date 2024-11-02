const path = require('path');
const fs = require('fs');
const db = require('../db');
const { error } = require('console');

exports.getShiftForm = (req, res) => {
    const query = 'SELECT id, person.name as name FROM staff join person on person.id = staff.id';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching staff:', err);
            return res.status(500).send('Server Error');
        }

        let optionsHtml = results.map(staff => {
            return `<option value="${staff.id}">${staff.name}</option>`;
        }).join('');

        fs.readFile(path.join(__dirname, '../client/templates/shiftaddform.html'), 'utf8', (err, html) => {
            if (err) {
                console.error('Error reading HTML file:', err);
                return res.status(500).send('Server Error');
            }

            html = html.replace('<!-- Dynamic options will be injected here -->', optionsHtml);
            res.send(html);
        });
    });
};

// Get divisions based on the selected zone
exports.getDivisions = (req, res) => {
    const selectedZone = req.query.zone;
    const query = `
        SELECT d.id, d.division 
        FROM divisions d 
        WHERE d.zone_id = (SELECT z.id FROM zones z WHERE z.zone = ?)
    `;

    db.query(query, [selectedZone], (err, results) => {
        if (err) {
            console.error('Error fetching divisions:', err);
            return res.status(500).send('Server Error');
        }

        const divisions = results.map(row => ({
            id: row.id,
            name: row.division
        }));
        
        res.json(divisions);
    });
};

// Add station with direct division ID
exports.addStation = (req, res) => {
    var id = req.body.stationId;
    var name = req.body.stationName;
    var divisionId = req.body.divisionId; // Now using divisionId directly

    const checkQuery = 'SELECT * FROM station WHERE id = ?';
    db.query(checkQuery, [id], (error,results) => {
        if (error) {
            console.error('Error checking division ID:', error);
            return res.status(500).send('Server Error');
        }

        if (results.length > 0) {
            // Division ID already exists
            return res.status(400).send('Addition failed: Station ID already exists');
        }else{
            var query = 'INSERT INTO station (id, name, division_id) VALUES (?, ?, ?)';
            db.query(query, [id, name, divisionId], (err, results) => {
                if (err) {
                    console.error('Error adding station:', err);
                    return res.status(500).send('Server Error');
                }
                console.log('Station added:', { id, name, divisionId });
                res.send('Station added successfully');
            });
        }
    });

};

