const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffAdd');

router.post("/add-staff", staffController.addStaff);
router.get("/staffform", staffController.getStaffForm);

module.exports = router;