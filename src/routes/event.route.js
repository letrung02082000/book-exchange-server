const express = require('express');
const router = express.Router();

const eventController = require('../app/controllers/event.controller');

router.get('/query', eventController.query);
router.post('/create', eventController.addEvent);
router.get('/:id', eventController.getEventById);

module.exports = router;
