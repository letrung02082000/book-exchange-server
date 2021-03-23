const express = require('express');
const router = express.Router();
const readerController = require('../app/controllers/reader.controller.js');
const userController = require('../app/controllers/user.controller');
const userauthenticationMiddleware = require('../app/middleware/userauthentication.middleware.js');

router.get('/query', readerController.query);
router.post('/create', readerController.addPost);
router.post('/like', userauthenticationMiddleware, userController.likePost);
router.post(
    '/removefromlikelist',
    userauthenticationMiddleware,
    userController.removeFromLikeList
);

module.exports = router;
