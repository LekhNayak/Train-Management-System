const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainAdd');

// Route to get train form
router.get('/trainForm', trainController.getTrainForm);

// Route to add train
router.post('/add-train', trainController.addTrain);

module.exports = router;
