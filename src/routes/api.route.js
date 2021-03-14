const express = require('express');
const router = express.Router();
const userRoute = require('./user.route');
const bookRoute = require('./book.route');
const adminRoute = require('./admin.route');
const orderRoute = require('./order.route');

router.use('/user', userRoute);
router.use('/book', bookRoute);
router.use('/order', orderRoute);
router.use('/admin', adminRoute);
module.exports = router;
