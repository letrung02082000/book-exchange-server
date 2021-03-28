const express = require('express');
const router = express.Router();
const readerController = require('../app/controllers/reader.controller.js');
const postController = require('../app/controllers/post.controller');
const userauthenticationMiddleware = require('../app/middleware/userauthentication.middleware.js');

router.get('/query', readerController.query);
router.post('/create', readerController.addPost);
router.post('/like', userauthenticationMiddleware, postController.likePost);
router.post(
    '/removeLike',
    userauthenticationMiddleware,
    postController.removeLike
);
router.post(
    '/comment',
    userauthenticationMiddleware,
    postController.commentPost
);
router.post(
    '/removecomment',
    userauthenticationMiddleware,
    postController.removeComment
);

module.exports = router;
