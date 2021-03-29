const express = require('express');
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
    '/getwishlist',
    userauthenticationMiddleware,
    userController.getWishList
);

module.exports = router;
