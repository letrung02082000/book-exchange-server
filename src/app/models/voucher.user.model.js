const mongoose = require('mongoose');
const userModel = require('./user.model');
const Schema = mongoose.Schema;

const voucherUserSchema = new Schema({
    voucher: { type: mongoose.Types.ObjectId, required: true, ref: 'voucher' },
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'user' },
});

const VoucherUserModel = mongoose.model('voucheruser', voucherUserSchema);

module.exports = {
    async createVoucherUser(voucherId, userId) {
        const voucherUser = new VoucherUserModel({
            voucher: mongoose.Types.ObjectId(voucherId),
            user: mongoose.Types.ObjectId(userId),
        });
        const err = voucherUser.validateSync();

        if (err) return { err: 'validate err' };

        const data = await voucherUser.save();
        return { data };
    },

    async createAllUsersVoucher(voucherId) {
        const allUsers = await userModel.loadAllUsers();
        let count = 0;
        const total = allUsers.length;

        for (let user of allUsers) {
            const voucherUser = new VoucherUserModel({
                user: mongoose.Types.ObjectId(user._id),
                voucher: mongoose.Types.ObjectId(voucherId),
            });
            const err = voucherUser.validateSync();

            if (err) {
                console.log('fail ' + user._id);
                continue;
            }

            const data = await voucherUser.save();

            if (data) {
                console.log('success ' + user._id);
                ++count;
            }
        }

        return { msg: `${count}/${total} users, see logs for detail` };
    },

    async loadVoucherByUser(userId) {
        return await VoucherUserModel.find({
            user: mongoose.Types.ObjectId(userId),
        }).populate('voucher');
    },

    async removeVoucherUser(voucherId, userId) {},
};
