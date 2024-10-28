const express = require('express');
const router = express.Router();
const divisionController = require('../controllers/divisionAdd');

// Route to get the division form
router.get('/divisionform', divisionController.getDivisionForm);

// Route to handle adding a division
router.post('/add-division', divisionController.addDivision);

module.exports = router;
