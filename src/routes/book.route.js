const express = require('express');
const router = express.Router();
const bookController = require('../app/controllers/book.controller.js');
//const userAuthentication = require('../app/middleware/userauthentication.middleware');
// router.post('/push', bookController.push);
const adminAuth = require('../app/middleware/adminAuth');
router.get('/review/:id', bookController.getReviews);
router.get('/getAll', bookController.getAllBooks);
router.get('/bestseller', bookController.getBestSeller);
router.get('/favorite', bookController.getFavorite);
router.get('/sku/:bookSku', bookController.getBookBySku);
router.get('/query', bookController.getBooksWithQuery); //query include: page, limit, category, search, quantity

router.get('/:id', bookController.getBookById);

router.post('/push', adminAuth, bookController.updateBookById);
router.post('/delete', adminAuth, bookController.removeBookById);
module.exports = router;
