const path = require('path');
const fs = require('fs');
const db = require('../db');

exports.getRouteForm = (req, res) => {
    const stationQuery = 'SELECT id, name FROM station'; 
    db.query(stationQuery, (err, stationResults) => {
        if (err) {
            console.error('Error fetching stations:', err);
            return res.status(500).send('Server Error: Could not fetch stations.');
        }

        const stationOptionsHtml = stationResults.map(station => {
            return `<option value="${station.id}">${station.name}</option>`;
        }).join('');

        fs.readFile(path.join(__dirname, '../client/templates/routeaddform.html'), 'utf8', (err, html) => {
            if (err) {
                console.error('Error reading HTML file:', err);
                return res.status(500).send('Server Error: Could not load the form.');
            }

            html = html
                .replace('<!-- Dynamic options will be injected here -->', stationOptionsHtml)
                .replace('<!-- Dynamic options will be injected here -->', stationOptionsHtml); 
            res.send(html);
        });
    });
};

exports.addRoute = (req, res) => {
    const routeId = req.body.routeId;
    const station1Id = req.body.station1; 
    const station2Id = req.body.station2; 

    if (!routeId || !station1Id || !station2Id) {
        return res.status(400).send('Invalid input: All fields are required.');
    }

    const checkRouteQuery = 'SELECT * FROM route WHERE id = ?';
    db.query(checkRouteQuery, [routeId], (err, results) => {
        if (err) {
            console.error('Error checking for existing route:', err);
            return res.status(500).send('Server Error: Could not verify existing routes.');
        }

        if (results.length > 0) {
            return res.status(400).send('Route ID already exists.');
        }

        if(station1Id === station2Id){
            return res.status(400).send('Both stations cannot be same.');
        }

        const insertQuery = 'INSERT INTO route (id, end1_id, end2_id) VALUES (?, ?, ?)';
        db.query(insertQuery, [routeId, station1Id, station2Id], (err) => {
            if (err) {
                console.error('Error adding route:', err);
                return res.status(500).send('Server Error: Could not add the route.');
            }
            res.send("Route added successfully");
        });
    });
};
