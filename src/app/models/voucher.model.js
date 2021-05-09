const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voucherSchema = new Schema({
    type: { type: Number, required: true, default: 1 }, // 1. giảm giá theo vnđ, 2. giảm giá theo %, 3. hoàn tiền, 4. giảm giá tại nhà sách
    code: { type: String, required: true, unique: true },
    value: { type: Number, required: true, default: 0 },
    title: { type: String, required: true, default: 'Voucher' },
    description: { type: String },
});

const VoucherModel = mongoose.model('voucher', voucherSchema);

module.exports = {
    async createVoucher(voucher) {
        const checkVoucherCode = await VoucherModel.find({
            code: voucher.code,
        }).lean();

        if (checkVoucherCode.length > 0) return { err: 'code exist' };

        let newVoucher = new VoucherModel(voucher);
        const err = newVoucher.validateSync();

        if (err) return { err: 'validate err' };

        const data = await newVoucher.save();

        if (data) return { data };
    },
};
