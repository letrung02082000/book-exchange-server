const express = require('express');
const router = express.Router();
const readerController = require('../app/controllers/reader.controller.js');

router.get('/query', readerController.query);
router.post('/create', readerController.addPost);

module.exports = router;
