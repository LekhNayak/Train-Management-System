const path = require('path');
const fs = require('fs');
const db = require('../db');

// Controller to get train form data and inject it into HTML template
exports.getTrainForm = (req, res) => {
    const typeQuery = 'SELECT type FROM train_type';
    const routeQuery = 'SELECT r.id, s1.name AS end1_name, s2.name AS end2_name FROM route r JOIN station s1 ON r.end1_id = s1.id JOIN station s2 ON r.end2_id = s2.id';

    // Fetch train types from the database
    db.query(typeQuery, (typeErr, typeResults) => {
        if (typeErr) {
            console.error('Error fetching train types:', typeErr);
            return res.status(500).send('Server Error');
        }

        // Fetch routes from the database
        db.query(routeQuery, (routeErr, routeResults) => {
            if (routeErr) {
                console.error('Error fetching routes:', routeErr);
                return res.status(500).send('Server Error');
            }

            // Generate HTML for train types
            const typeOptionsHtml = typeResults.map(type => {
                return `<option value="${type.type}">${type.type}</option>`;
            }).join('');

            // Generate HTML for routes as "source - destination" with route_id as the value
            const routeOptionsHtml = routeResults.map(route => {
                return `<option value="${route.id}">${route.end1_name} - ${route.end2_name}</option>`;
            }).join('');

            // Read the HTML file
            fs.readFile(path.join(__dirname, '../client/templates/trainaddform.html'), 'utf8', (err, html) => {
                if (err) {
                    console.error('Error reading HTML file:', err);
                    return res.status(500).send('Server Error');
                }

                // Inject options into HTML template
                html = html.replace('<!-- Dynamic options here -->', typeOptionsHtml);
                html = html.replace('<!-- Dynamic options here -->', routeOptionsHtml);

                // Send the HTML response
                res.send(html);
            });
        });
    });
};

exports.addTrain = (req, res) => {
    // Extract data from request body
    const { trainno, trainName, type, route, departure, arrival, direction } = req.body;

    // Define the insert query
    const query = `INSERT INTO train (train_no, name, type, route_id, depart, arrive, direction) 
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;

    // Execute the query
    db.query(query, [trainno, trainName, type, route, departure, arrival, direction], (err, result) => {
        if (err) {
            console.error('Error adding train:', err);
            return res.status(500).send('Server Error');
        }
        
        // Send success response
        res.send('Train added successfully');
    });
};