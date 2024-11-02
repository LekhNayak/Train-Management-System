const path = require('path');
const fs = require('fs');
const db = require('../db');
const { error } = require('console');
const exp = require('constants');

exports.getStaffForm = (req, res) => {
    fs.readFile(path.join(__dirname, '../client/templates/staffaddform.html'), 'utf8', (err, html) => {
        if (err) {
            console.error('Error reading HTML file:', err);
            return res.status(500).send('Server Error');
        }
        res.send(html);
    });
};

exports.addStaff = (req, res) => {
    const id = req.body.staffId;
    const name = req.body.name;
    const role = req.body.role;
    const dob = req.body.dob; 

    const checkQuery = 'SELECT * FROM person WHERE id = ?';
    db.query(checkQuery, [id], (error, results) => {
        if (error) {
            console.error('Error checking staff ID:', error);
            return res.status(500).send('Server Error');
        }

        if (results.length > 0) {
            // Staff ID already exists
            return res.status(400).send('Addition failed: Staff ID already exists');
        } else {
            const personQuery = 'INSERT INTO person (id, name, dob) VALUES (?, ?, ?)';
            db.query(personQuery, [id, name, dob], (err, results) => {
                if (err) {
                    console.error('Error adding person:', err);
                    return res.status(500).send('Server Error');
                }

                const staffQuery = "INSERT INTO staff (id, role) VALUES (?, ?)";
                db.query(staffQuery, [id, role], (err, results) => {
                    if (err) {
                        console.error('Error adding staff:', err);
                        return res.status(500).send('Server Error');
                    }
                    console.log('Staff added:', { id, name, dob, role });
                    res.send('Staff added successfully');
                });
            });
        }
    });
};
