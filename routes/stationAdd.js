const express = require('express');
const router = express.Router();
const stationController = require('../controllers/stationAdd');

router.get('/stationform', stationController.getStationForm);
router.get('/get-divisions', stationController.getDivisions);
router.post('/add-station', stationController.addStation);
router.get('/station', stationController.getStationList);
router.get('/station/search', stationController.searchStation);


module.exports = router;
