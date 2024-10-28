const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'Admin',
    password: 'Tms@123',
    database: 'TrainSystem'
});

module.exports = db;
