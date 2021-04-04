const express = require('express');
const donationController = require('../app/controllers/donation.controller.js');
const eventUserController = require('../app/controllers/event.user.controller.js');
const orderController = require('../app/controllers/order.controller.js');
const router = express.Router();
const userController = require('../app/controllers/user.controller.js');
const userauthenticationMiddleware = require('../app/middleware/userauthentication.middleware.js');

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.post(
    '/addtowishlist',
    userauthenticationMiddleware,
    userController.addToWishList
);
router.post(
    '/removefromwishlist',
    userauthenticationMiddleware,
    userController.removeFromWishList
);
router.get(
    '/wishlist',
    userauthenticationMiddleware,
    userController.getWishList
);

router.post('/donation', donationController.requestDonation);

router.get(
    '/allorders',
    userauthenticationMiddleware,
    orderController.getAllOrders
);
router.get(
    '/confirmedorders',
    userauthenticationMiddleware,
    orderController.getConfirmedOrders
);
router.get(
    '/allevents',
    userauthenticationMiddleware,
    eventUserController.getAllEventsByUser
);
router.get(
    '/joinedevents',
    userauthenticationMiddleware,
    eventUserController.getJoinedEventsByUser
);
router.get(
    '/alldonations',
    userauthenticationMiddleware,
    donationController.getAllDonationsByUser
);

module.exports = router;
