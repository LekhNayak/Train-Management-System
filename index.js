const express = require('express');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql2');
const db = require('./db');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '/client/src/static')));
app.use(express.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// MySQL connection check
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database');
});
// MySQL connection check ends 

// Routes
const stationRoutes = require('./routes/stationAdd');
const zoneRoutes = require('./routes/zoneAdd');
const divisionRoutes = require('./routes/divisionAdd');
const routeRoutes = require('./routes/routeAdd');
const trainRoutes = require('./routes/trainAdd');
const stopRoutes = require('./routes/stopAdd');
const staffRoutes = require('./routes/staffAdd');
const loginAuth = require('./routes/loginAuth');
// Routes ends

app.use('/auth', loginAuth);
app.use('/', stationRoutes);
app.use('/', zoneRoutes);
app.use('/', divisionRoutes);
app.use('/', routeRoutes);
app.use('/', stopRoutes);
app.use('/', trainRoutes);
app.use('/', staffRoutes);




app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/templates/login.html'));
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
