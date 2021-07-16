const express = require('express');
const orderController = require('../app/controllers/order.controller');
const adminAuth = require('../app/middleware/adminAuth');
const router = express.Router();

router.post('/create', orderController.createOrder);
router.post('/status', adminAuth, orderController.updateOrderStatus);
router.get('/', adminAuth, orderController.queryOrders);

module.exports = router;
