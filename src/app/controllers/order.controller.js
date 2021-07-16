const orderModel = require('../models/order.model');
const mongoose = require('mongoose');

module.exports = {
    async queryOrders(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const data = await orderModel.queryOrders(page, limit);

        let newData = data.map((child, index) => {
            let dictionary = ['T2', 'T3', 'T4', 'T6', 'T7', 'CN'];
            let date = new Date(child.orderDate);

            child.orderDate = `${
                dictionary[0]
            }, ngày ${date.getDate()}, tháng ${
                date.getMonth() + 1
            }, ${date.getFullYear()}`;

            return child;
        });

        if (data.length <= 0)
            return res.json({
                type: 'Invalid',
                err: 'order not found',
            });

        return res.json({
            type: 'Valid',
            data: data,
        });
    },

    async updateOrderStatus(req, res) {
        if (!req.body) {
            return res.json({ type: 'Invalid', err: 'no order id' });
        }

        const status = await orderModel.updateOrderStatus(
            req.body.id,
            req.body.status
        );

        if (status == true) {
            return res.json({ type: 'Valid' });
        }

        return res.json({ type: 'Invalid' });
    },

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
        if (!req.body.bookList || req.body.bookList.length <= 0) {
            return res.json({
                type: 'Invalid',
                err: 'no book',
            });
        }

        let order = {
            bookList: req.body.bookList,
            pending: true,
            tel: req.body.tel,
            address: req.body.address,
            shipping: req.body.shipping,
            payment: req.body.payment,
        };

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
