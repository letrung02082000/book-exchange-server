const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    pending: { type: Boolean, required: true, default: true },
    tel: { type: String, required: true },
    address: { type: String, required: true },
    content: { type: String, required: true },
    point: { type: Number, required: true, default: 0 },
});

const DonationModel = mongoose.model('donation', donationSchema);

module.exports = {
    async createDonation(donation) {
        let newDonation = new DonationModel({
            user: mongoose.Types.ObjectId(donation.user),
            pending: true,
            tel: donation.tel,
            address: donation.address,
            content: donation.content,
        });

        const err = newDonation.validateSync();

        if (err) return { err: 'create donation fail' };
        return { data: newDonation };
    },

    async updatePoint(donationId, point) {
        let donation = await DonationModel.findById(donationId);
        donation.point = point;

        await donation.save();
        return { data: donation };
    },
};
