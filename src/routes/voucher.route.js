const express = require('express');
const voucherController = require('../app/controllers/voucher.controller');
const router = express.Router();

const adminAuth = require('../app/middleware/adminAuth');

router.post('/create', adminAuth, voucherController.createVoucher);
router.post(
    '/addtoallusers',
    adminAuth,
    voucherController.addVoucherToAllUsers
);

module.exports = router;
