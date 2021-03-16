const express = require('express');
const router = express.Router();
const bookController = require('../app/controllers/book.controller.js');
//const userAuthentication = require('../app/middleware/userauthentication.middleware');
// router.post('/push', bookController.push);
const adminAuth = require('../app/middleware/adminAuth');
router.get('/getAll', bookController.getAllBooks);
router.get('/bestseller', bookController.getBestSeller);
router.get('/favorite', bookController.getFavorite);
router.get('/sku/:bookSku', bookController.getBookBySku);
router.get('/query', bookController.getBooksPerPage);
router.get('/:id', bookController.getBookById);

router.post('/push', adminAuth, bookController.updateBookById);
router.post('/delete', adminAuth, bookController.removeBookById);
module.exports = router;
