const express = require('express');
const router = express.Router();
const userRoute = require('./user.route');
const bookRoute = require('./book.route');
const adminRoute = require('./admin.route');
const orderRoute = require('./order.route');
const categoryRoute = require('./category.route');
const postRoute = require('./post.route');
const eventRoute = require('./event.route');
const stationRoute = require('./station.route');
const voucherRoute = require('./voucher.route');

router.use('/user', userRoute);
router.use('/category', categoryRoute);
router.use('/book', bookRoute);
router.use('/order', orderRoute);
router.use('/admin', adminRoute);
router.use('/post', postRoute);
router.use('/event', eventRoute);
router.use('/station', stationRoute);
router.use('/voucher', voucherRoute);

module.exports = router;
