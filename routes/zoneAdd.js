const express = require('express');
const router = express.Router();
const zoneController = require('../controllers/zoneAdd');

router.get('/zoneform', zoneController.getZoneForm);
router.post('/add-zone', zoneController.addZone);

module.exports = router;
