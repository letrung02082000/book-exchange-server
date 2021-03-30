const express = require('express');
const router = express.Router();

const eventController = require('../app/controllers/event.controller');
const eventUserController = require('../app/controllers/event.user.controller');
const adminAuth = require('../app/middleware/adminAuth');
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
router.post('/allusers', adminAuth, eventUserController.getAllUsersByEvent); // body: eventId
router.get('/:id', eventController.getEventById);

module.exports = router;
