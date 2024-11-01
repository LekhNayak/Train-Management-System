const path = require('path');
const fs = require('fs');
const db = require('../db');

// Fetch trains and render the stop form with these options
exports.getStopForm = (req, res) => {
    // Check if a train is selected
    const selectedTrain = req.query.trainSelect;

    if (selectedTrain) {
        const stationQuery = `
            SELECT 
                s1.name AS end1_name, 
                s2.name AS end2_name,
                t1.depart AS end1_depart,
                t2.arrive AS end2_arrival
            FROM 
                route r 
            JOIN 
                station s1 ON r.end1_id = s1.id 
            JOIN 
                station s2 ON r.end2_id = s2.id 
            JOIN 
                train t1 ON r.id = t1.route_id AND t1.train_no = ? 
            JOIN 
                train t2 ON r.id = t2.route_id AND t2.train_no = ?
            WHERE 
                r.id = (SELECT route_id FROM train WHERE train_no = ?)
        `;

        db.query(stationQuery, [selectedTrain, selectedTrain, selectedTrain], (err, results) => {
            if (err) {
                console.error('Error fetching stations:', err);
                return res.status(500).send('Server Error');
            }

            if (results.length > 0) {
                const {
                    end1_name, 
                    end2_name, 
                    end1_depart, 
                    end2_arrival
                } = results[0];

                // Send the names and arrival/departure times back as JSON
                return res.json({ 
                    end1_name, 
                    end2_name, 
                    end1_depart, 
                    end2_arrival
                });
            } else {
                return res.status(404).json({ message: 'No stations found' });
            }
        });
    } else {
        // If no train is selected, fetch the list of trains to render the stop form
        const trainQuery = 'SELECT train_no, name, route_id FROM train';

        db.query(trainQuery, (err, trainResults) => {
            if (err) {
                console.error('Error fetching trains:', err);
                return res.status(500).send('Server Error');
            }

            const trainOptions = trainResults.map(train => 
                `<option value="${train.train_no}">${train.train_no} - ${train.name}</option>`
            ).join('');

            // Read the HTML template and inject dynamic train options
            fs.readFile(path.join(__dirname, '../client/templates/stopaddform.html'), 'utf8', (err, html) => {
                if (err) {
                    console.error('Error reading HTML file:', err);
                    return res.status(500).send('Server Error');
                }
                html = html.replace('<!-- Dynamic train options will be injected here -->', trainOptions);
                res.send(html);
            });
        });
    }
};

exports.getAllStation = (req, res) => {
    const query = 'SELECT id, name FROM station';

    db.query(query, (err, results) => {
        if(err){
            console.error("Error fetching stations", err);
            return res.status(500).send('Server Error');
        }

        let optionsHtml = results.map(station => {
            return `<option value="${station.id}">${station.name}</option>`;
        }).join('');

        res.json({ optionsHtml });
    });
};

// Insert a new stop
exports.addStop = (req, res) => {
    console.log('Received request to add stop:', req.body); 
    const stops = req.body.stops; // Accessing all stops data from the request body

    // Iterate over each stop in the stops array
    stops.forEach(stop => {
        // Fetch route_id based on train_no (using stop.trainNo)
        const routeQuery = 'SELECT route_id FROM train WHERE train_no = ?';

        db.query(routeQuery, [stop.trainNo], (err, results) => { // Use stop.trainNo here
            if (err) {
                console.error('Error fetching route ID:', err);
                return res.status(500).json({ message: 'Server Error while fetching route ID' });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'Train not found for ' + stop.trainNo });
            }

            const routeId = results[0].route_id; // Get the route_id from the results

            // Now insert the stop with the fetched route_id
            const insertQuery = `
                INSERT INTO stops (train_no, station_id, route_id, stop_order, arrival, departure)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            db.query(insertQuery, [stop.trainNo, stop.stationId, routeId, stop.order, stop.arrival, stop.depart], (err, results) => {
                if (err) {
                    console.error('Error inserting stop:', err);
                    return res.status(500).json({ message: 'Server Error while inserting stop' });
                }
            });
        });
    });

    res.status(201).json({ message: 'Stops added successfully' }); // Send success response after all stops are processed
};
