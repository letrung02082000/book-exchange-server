const express = require('express');
const router = express.Router();
const stationController = require('../app/controllers/station.controller');
const adminAuth = require('../app/middleware/adminAuth');

router.get('/query', stationController.getAllStations);
router.get('/:id', stationController.getStationById);

router.post('/add', adminAuth, stationController.addStation);

module.exports = router;
