const orderModel = require('../models/order.model');
const mongoose = require('mongoose');

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

    async getPendingOrders(req, res) {
        const data = await orderModel.loadPendingOrdersByUser(req.headers.id);

        if (data && data.length > 0) return res.json({ type: 'Valid', data });
        return res.json({ type: 'Invalid', err: 'order not found' });
    },

    async createOrder(req, res) {
        if (!req.body.bookList) {
            return res.json({
                type: 'Invalid',
            });
        }

        let order = req.body;

        if (req.headers.id) {
            order.user = mongoose.Types.ObjectId(req.headers.id);
        } else {
            order.user = null;
        }

        const { data, err } = await orderModel.createOrder(order);

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
