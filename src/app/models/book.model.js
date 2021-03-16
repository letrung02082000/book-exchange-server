const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    sku: { type: String, required: true },
    quantity: { type: Number, require: true },
    name: { type: String, required: true },
    newprice: { type: Number, default: 0 },
    oldprice: { type: Number, default: 0 },
    type: { type: String, default: 'show' }, //hidden or show
    imageurl: { type: String, default: null },
    description: { type: String, default: '' },
    pushtime: { type: Date, required: true },
    others: { type: Array, default: [] },

    //author: { type: Schema.Types.ObjectId },
    category: { type: Schema.Types.ObjectId, ref: 'category' },

    buyCount: { type: Number, default: 0 },
    buyCount: { type: Number, default: 0 },
});

const BookModel = mongoose.model('book', bookSchema);

module.exports = {
    loadAllBooks() {
        return BookModel.find().sort({ pushtime: -1 }).lean();
    },

    loadAllBooksWithQuantity() {
        return BookModel.find({ quantity: { $gt: 0 } })
            .sort({ pushtime: -1 })
            .lean();
    },

    loadBookById(bookId) {
        return BookModel.findById({
            _id: mongoose.Types.ObjectId(bookId),
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

    loadBookPerPageWithQuantity(page, limit) {
        return BookModel.find({ quantity: { $gt: 0 } })
            .sort({ pushtime: -1 })
            .limit(limit)
            .skip((page - 1) * limit)
            .lean();
    },

    removeBookById(_id) {
        return BookModel.findByIdAndDelete(_id).lean();
    },
    async updateBookById(_id, newBook) {
        let newBookModel;

        if (!_id) {
            newBook['pushtime'] = new Date();
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
    },

    loadBestSeller(page, limit) {
        return BookModel.find({ quantity: { $gt: 0 } })
            .sort({ buyCount: -1 })
            .limit(limit)
            .skip((page - 1) * limit)
            .lean();
    },

    loadFavorite(page, limit) {
        return BookModel.find({ quantity: { $gt: 0 } })
            .sort({ favorite: -1 })
            .limit(limit)
            .skip((page - 1) * limit)
            .lean();
    },

    async updateQuantity(bookId, newQuantity) {
        let book = await BookModel.findById(mongoose.Types.ObjectId(bookId));
        book.quantity = newQuantity;
        await book.save();
    },
};
