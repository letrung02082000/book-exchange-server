const orderModel = require('../models/order.model');

module.exports = {
    async getAllOrders(req, res) {
        const data = await orderModel.loadOrdersByUser(req.headers.id);

        if (data && data.length > 0) return res.json({ type: 'Valid', data });
        return res.json({ type: 'Invalid', err: 'order not found' });
    },

    async getConfirmedOrders(req, res) {
        const data = await orderModel.loadConfirmedOrdersByUser(req.headers.id);

        if (data && data.length > 0) return res.json({ type: 'Valid', data });
        return res.json({ type: 'Invalid', err: 'order not found' });
    },

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
