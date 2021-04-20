const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' },
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
        await newDonation.save();

        if (err) return { err: 'create donation fail' };
        return { data: newDonation };
    },

    async confirmDonation(donationId, point) {
        let donation = await DonationModel.findById(donationId);
        donation.point = point;

        await donation.save();
        return { data: donation };
    },

    loadDonationById(donationId) {
        return DonationModel.findById(donationId).lean();
    },

    loadAllDonationsByUser(userId) {
        return DonationModel.find({
            user: mongoose.Types.ObjectId(userId),
        }).lean();
    },

    loadConfirmedDonationsByuser(userId) {
        return DonationModel.find({
            user: mongoose.Types.ObjectId(userId),
            pending: false,
        }).lean();
    },
};
