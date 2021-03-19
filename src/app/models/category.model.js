const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
});

const CategoryModel = mongoose.model('categories', categorySchema);

module.exports = {
    loadAllCategories() {
        return CategoryModel.find().lean();
    },

    async createCategory(category) {
        try {
            const newCategory = {
                name: category.name,
                description: category.description,
            };
            await CategoryModel.create(newCategory);
            return {
                data: newCategory,
            };
        } catch (error) {
            console.log(error);
            return {
                err: error,
            };
        }
    },
};
