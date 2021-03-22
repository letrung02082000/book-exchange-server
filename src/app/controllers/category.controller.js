const BookModel = require('../models/book.model');
const CategoryModel = require('../models/category.model');

module.exports = {
    async getAllCategories(req, res) {
        const allCategories = await CategoryModel.loadAllCategories();
        res.json({
            type: 'Valid',
            data: allCategories,
        });
    },

    async addCategory(req, res) {
        if (!req.body) {
            return res.json({
                type: 'Invalid',
            });
        }

        const { err, data } = await CategoryModel.createCategory(req.body);

        if (err) {
            return res.json({
                type: 'Invalid',
                err: err,
            });
        }

        return res.json({
            type: 'Valid',
            data,
        });
    },

    async getBooksByCategories(req, res) {
        const categories = await CategoryModel.loadAllCategories();

        let result = [];

        for (let child of categories) {
            let category = { title: child.name, id: child._id };
            const book = await BookModel.query(1, 10, child._id, null, 0);

            if (book) {
                category.data = book;
            } else {
                category.data = [];
            }

            result.push(category);
        }

        if (result.length > 0) return res.json({ type: 'Valid', data: result });
        return res.json({ type: 'Invalid', err: 'Không có dữ liệu' });
    },
};
