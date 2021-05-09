const voucherModel = require('../models/voucher.model');
const voucherUserModel = require('../models/voucher.user.model');

module.exports = {
    async createVoucher(req, res) {
        const voucher = {
            type: req.body.type,
            code: req.body.code,
            value: req.body.value,
            title: req.body.title,
            description: req.body.description,
        };

        const { err, data } = await voucherModel.createVoucher(voucher);

        if (err) return res.json({ type: 'Invalid', err: err });
        return res.json({ type: 'Valid', data });
    },

    async addVoucherToUser(req, res) {
        const { err, data } = await voucherUserModel.createVoucherUser(
            req.body.voucher,
            req.body.user
        );

        if (data) return res.json({ type: 'Valid', data });
        return res.json({ type: 'Invalid', err });
    },

    async addVoucherToAllUsers(req, res) {
        const { msg } = await voucherUserModel.createAllUsersVoucher(
            req.body.voucher
        );

        return res.json({ msg });
    },
};
