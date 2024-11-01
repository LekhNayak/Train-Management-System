const express = require('express');
const router = express.Router();
const stopController = require('../controllers/stopAdd');

// Route to get the stop form
router.get('/stopform', stopController.getStopForm);
router.get('/allstations', stopController.getAllStation);
router.post('/add-stop', stopController.addStop);

module.exports = router;
