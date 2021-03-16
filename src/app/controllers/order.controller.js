const orderModel = require('../models/order.model');

module.exports = {
    async createOrder(req, res) {
        console.log(req.body);
        if (!req.body.bookList) {
            return res.json({
                type: 'Invalid',
            });
        }

        const { data, err } = await orderModel.createOrder(req.body);

        if (err) {
            return res.json({
                type: 'Invalid',
                err,
            });
        }

        return res.json({
            type: 'Valid',
            data: data,
        });
    },
};
