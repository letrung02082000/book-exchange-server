const express = require('express');
const stationController = require('../app/controllers/station.controller');
const router = express.Router();

router.get('/query', stationController.getAllStations);
router.get('/:id', stationController.getStationById);

router.post('/add', stationController.addStation);

module.exports = router;
