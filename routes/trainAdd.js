const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainAdd');

router.get('/trainForm', trainController.getTrainForm);
router.post('/trains/add-train', trainController.addTrain);
router.get('/trains', trainController.getTrainList);
router.get('/stations', trainController.getStations);
router.get('/trains/search', trainController.searchTrains);

module.exports = router;
