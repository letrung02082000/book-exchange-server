const express = require('express');
const router = express.Router();

const eventController = require('../app/controllers/event.controller');
const eventUserController = require('../app/controllers/event.user.controller');
const userauthenticationMiddleware = require('../app/middleware/userauthentication.middleware');

router.get('/query', eventController.query);
router.post('/create', eventController.addEvent);
router.post(
    '/join',
    userauthenticationMiddleware,
    eventUserController.joinEvent
);
router.post(
    '/remove',
    userauthenticationMiddleware,
    eventUserController.leaveEvent
);
router.get('/:id', eventController.getEventById);

module.exports = router;
