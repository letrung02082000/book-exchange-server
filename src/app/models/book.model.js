const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
    sku: { type: String, required: true },
    quantity: { type: Number, require: true },
    name: { type: String, required: true },
    price: { type: Number, default: 0 },
    type: { type: String }, //selling or sold
    imageurl: { type: String, default: null },
    description: { type: String, default: "" },
    pushtime: { type: Date, required: true },
    others: { type: Array, default: [] },

    author: { type: mongoose.Types.ObjectId },
    category: { type: mongoose.Types.ObjectId }
});

const BookModel = mongoose.model("book", bookSchema);

module.exports = {
    loadAllBooks() {
        return BookModel.find({}).sort({ pushtime: -1 }).lean();
    },

    loadBookById(bookId) {
        return BookModel.findById({
            _id: mongoose.Types.ObjectId(bookId)
        }).lean();
    },

    loadBookBySku(bookSku) {
        return BookModel.find({ sku: bookSku }).lean();
    },

    loadBookPerPage(page, limit) {
        return BookModel.find()
            .sort({ pushtime: -1 })
            .limit(limit)
            .skip((page - 1) * limit)
            .lean();
    },
    removeBookById(_id) {
        return BookModel.findOneAndDelete(_id).lean();
    },
    async updateBookById(_id, newBook) {
        let newBookModel;

        if (!_id) {
            newBook["pushtime"] = new Date();
            newBookModel = new BookModel(newBook);
        } else {
            newBookModel = await BookModel.findById(_id);
            if (!newBookModel.pushtime) newBook.pushtime = new Date();
            for (let key in newBook) newBookModel[key] = newBook[key];
        }
        let error = newBookModel.validateSync();
        if (!error) {
            await newBookModel.save();
            return { data: newBookModel };
        }
        let err = [];
        for (let key in error.errors)
            err.push(error.errors[key].properties.message);
        return { err: err };
    }
};
