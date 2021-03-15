const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderId: { type: String, required: true },
    bookList: [
        {
            bookId: {
                type: Schema.Types.ObjectId,
                ref: 'book',
                required: true,
            },
            quantity: { type: Number, required: true },
        },
    ],
    user: { type: Schema.Types.ObjectId, ref: 'user', default: null },
    pending: { type: Boolean, default: true },
    orderDate: { type: Date, default: Date.now },
    tel: { type: String, required: true },
    address: { type: String, default: null },
    shipping: { type: Boolean, default: true }, // true: giao hàng tận nơi, false: nhận sách tại tủ sách
    payment: { type: Boolean, default: true }, //true: thanh toán khi nhận sách, false: thanh toán qua momo
});

const OrderModel = mongoose.model('order', orderSchema);

module.exports = {
    async createOrder(order) {
        let newOrder;
        const orderid = require('order-id')('khoa-don-hang');
        const id = orderid.generate();
        const checkOrderId = await OrderModel.find({ orderId: id.toString() });

        if (checkOrderId.length > 0) {
            return { err: 'order id existed' };
        }

        try {
            order.orderId = id;
            order['orderDate'] = new Date();
            await OrderModel.create(order);
            return {
                data: order,
            };
        } catch (error) {
            return { err: error };
        }

        // let error = newOrder.validateSync();

        // console.log(error);

        // if (!error) {
        //     await newOrder.save();
        //     return {
        //         data: newOrder,
        //     };
        // }

        // return {
        //     err: 'validate sync fail',
        // };
    },
};
