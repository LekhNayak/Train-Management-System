const express = require('express');
const router = express.Router();
const stationController = require('../controllers/stationAdd');

router.get('/stationform', stationController.getStationForm);
router.get('/get-divisions', stationController.getDivisions);
router.post('/add-station', stationController.addStation);

module.exports = router;
