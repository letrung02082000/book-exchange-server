const donationModel = require('../models/donation.model');

module.exports = {
    async requestDonation(req, res) {
        if (!req.body.tel || !req.body.address || !req.body.content)
            return res.json({ type: 'Invalid', err: 'fill all fields' });

        const donation = {
            tel: req.body.tel,
            address: req.body.address,
            content: req.body.content,
            user: req.headers.id,
        };

        const { err, data } = await donationModel.createDonation(donation);

        if (err) return res.json({ type: 'Invalid', err });
        if (data) return res.json({ type: 'Valid', data });
    },
};
