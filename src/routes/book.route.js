const express = require('express');
const router = express.Router();
const bookController = require('../app/controllers/book.controller.js');
//const userAuthentication = require('../app/middleware/userauthentication.middleware');
// router.post('/push', bookController.push);
router.get('/getAll', bookController.getAllBooks);
router.get('/sku/:bookSku', bookController.getBookBySku);
router.get('/query', bookController.getBooksPerPage);
router.get('/:id', bookController.getBookById);

module.exports = router;
