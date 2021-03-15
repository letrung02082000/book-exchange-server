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
};
