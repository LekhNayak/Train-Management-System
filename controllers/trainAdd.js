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

exports.getTrainList = (req, res) => {
    // SQL query to get trains along with route names
    const trainQuery = `
        SELECT t.train_no, t.name, t.type, r.id AS route_id, 
               s1.name AS end1_name, s2.name AS end2_name, 
               t.depart, t.arrive, t.direction 
        FROM train t 
        JOIN route r ON t.route_id = r.id 
        JOIN station s1 ON r.end1_id = s1.id 
        JOIN station s2 ON r.end2_id = s2.id`;

    // Execute the query
    db.query(trainQuery, (err, trainResults) => {
        if (err) {
            console.error('Error fetching train list:', err);
            return res.status(500).send('Server Error');
        }

        // Pass the results to the EJS template
        res.render('trainSelect', { trains: trainResults });
    });
};

// Method to search trains
exports.searchTrains = (req, res) => {
    const { trainNo, sourceStation, destinationStation } = req.query;

    let query = `
    SELECT DISTINCT t.train_no, t.name, t.type, r.id AS route_id, 
           s1.name AS end1_name, s2.name AS end2_name, 
           t.depart, t.arrive, t.direction 
    FROM train t 
    JOIN route r ON t.route_id = r.id 
    JOIN stops st1 ON t.route_id = st1.route_id  -- For the source station
    JOIN stops st2 ON t.route_id = st2.route_id  -- For the destination station
    JOIN station s1 ON r.end1_id = s1.id 
    JOIN station s2 ON r.end2_id = s2.id
    WHERE 1=1`;

    const params = [];

    if (trainNo) {
        query += ' AND t.train_no = ?'; // Use t.train_no to reference the correct table
        params.push(trainNo);
    }

    if (sourceStation) {
        query += ' AND st1.station_id = ?';
        params.push(sourceStation); // Add source station ID
    }

    if (destinationStation) {
        query += ' AND st2.station_id = ?';
        params.push(destinationStation); // Add destination station ID
    }

    // Log the query and parameters for debugging
    console.log('Executing Query:', query);
    console.log('With Parameters:', params);

    db.query(query, params, (err, results) => {
        if (err) {
            console.error('Error fetching trains:', err);
            return res.status(500).send('Server Error');
        }
        res.json(results); // Send back the results as JSON
    });
};


exports.getStations = (req, res) => {
    const stationQuery = 'SELECT id, name FROM station'; 
    db.query(stationQuery, (err, stationResults) => {
        if (err) {
            console.error('Error fetching stations:', err);
            return res.status(500).send('Server Error: Could not fetch stations.');
        }

        // Map the stations to HTML option elements
        const stationOptionsHtml = stationResults.map(station => {
            return `<option value="${station.id}">${station.name}</option>`;
        }).join('');

        // Read the EJS template file
        const templatePath = path.join(__dirname, '../views/trainSelect.ejs');
        fs.readFile(templatePath, 'utf8', (err, html) => {
            if (err) {
                console.error('Error reading HTML file:', err);
                return res.status(500).send('Server Error: Could not load the form.');
            }

            // Replace placeholder with station options
            html = html.replace('<!-- Dynamic options will be injected here -->', stationOptionsHtml);
            
            // Send the final HTML to the client
            res.send(html);
        });
    });
};