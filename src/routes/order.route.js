const express = require('express');
const orderController = require('../app/controllers/order.controller');
const router = express.Router();

router.post('/create', orderController.createOrder);
router.post('/status', orderController.updateOrderStatus);
router.get('/', orderController.queryOrders);

module.exports = router;
