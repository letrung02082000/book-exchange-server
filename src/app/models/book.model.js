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
    station: {
        type: Schema.Types.ObjectId,
        ref: 'station',
        required: true,
        default: mongoose.Types.ObjectId('606494f90494e72dbcbee3b9'),
    },

    //author: { type: Schema.Types.ObjectId },
    category: { type: Schema.Types.ObjectId, ref: 'categories' },

    buyCount: { type: Number, default: 0 },
    buyCount: { type: Number, default: 0 },
});
bookSchema.index({ '$**': 'text' });

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
        })
            .populate('category')
            .lean();
    },

    loadBookBySku(bookSku) {
        return BookModel.find({ sku: bookSku }).populate('category').lean();
    },

    async query(page, limit, category, search, quantity, sort) {
        const query = [];
        let match = {};

        if (search) {
            match = { $text: { $search: search } };
        }

        if (category) {
            match.category = mongoose.Types.ObjectId(category);
        }

        if (quantity == 0) {
            match.quantity = { $gt: 0 };
        }

        query.push({ $match: match });

        if (page && limit) {
            query.push({
                $skip: (page - 1) * limit,
            });
            query.push({ $limit: limit });
        }

        if (search) {
            query.push({ $sort: { score: { $meta: 'textScore' }, name: -1 } });
        } else {
            query.push({
                $sort: { pushtime: -1 },
            });
        }

        // query.push({
        //     $lookup: {
        //         from: 'station',
        //         localField: '_id',
        //         foreignField: 'station',
        //         as: 'station',
        //     },
        // });

        const data = await BookModel.aggregate(query);
        return BookModel.populate(data, [
            { path: 'station' },
            { path: 'category' },
        ]);
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
