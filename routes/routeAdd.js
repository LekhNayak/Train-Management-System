const express = require('express');
const router = express.Router();
const routeController = require('../controllers/routeAdd');


router.get('/routeform', routeController.getRouteForm);
router.post('/add-route', routeController.addRoute);

module.exports = router;