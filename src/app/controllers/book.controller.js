const { post } = require('../../routes/post.route');
const { removeBookById, updateBookById } = require('../models/book.model');
const bookModel = require('../models/book.model');
const readerModel = require('../models/reader.model');
module.exports = {
    async getAllBooks(req, res) {
        //find book in db sorted by time push
        const allBooks = await bookModel.loadAllBooks();

        if (allBooks.length > 0) {
            res.json({ type: 'Valid', data: allBooks });
        } else {
            res.json({ type: 'Invalid' });
        }
    },

    async getBooksWithQuery(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const category = req.query.category;
        const search = req.query.search;
        const quantity = parseInt(req.query.quantity);
        const sort = parseInt(req.query.sort);
        console.log(quantity);

        let books = [];
        try {
            books = await bookModel.query(
                page,
                limit,
                category,
                search,
                quantity,
                sort
            );
        } catch (error) {
            console.log(error);
            res.json({ type: 'Invalid', err: 'Có lỗi xảy ra' });
        }

        if (books.length > 0) {
            res.json({ type: 'Valid', data: books });
        } else {
            res.json({ type: 'Invalid', err: 'Không có dữ liệu' });
        }
    },

    async getBookById(req, res) {
        const bookId = req.params.id;
        const book = await bookModel.loadBookById(bookId);

        console.log(book);

        if (book) {
            res.json({ type: 'Valid', data: book });
        } else {
            res.json({ type: 'Invalid' });
        }
    },

    async removeBookById(req, res) {
        if (!req.body._id) {
            return res.json({ type: 'Invalid' });
        }
        let result = await bookModel.removeBookById(req.body._id);
        return res.json({ type: 'Valid', data: result });
    },
    async updateBookById(req, res) {
        console.log(req.body);
        if (!req.body.book) {
            return res.json({ type: 'Invalid' });
        }
        let { err, data } = await bookModel.updateBookById(
            req.body._id,
            req.body.book
        );

        return res.json({ type: 'Valid', data: data, err: err });
    },
    async getBookBySku(req, res) {
        const bookSku = req.params.bookSku;
        console.log(bookSku);
        const book = await bookModel.loadBookBySku(bookSku);

        if (book.length > 0) {
            res.json({ type: 'Valid', data: book });
        } else {
            res.json({ type: 'Invalid' });
        }
    },

    async getBestSeller(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const book = await bookModel.loadBestSeller(page, limit);

        if (book.length > 0) {
            res.json({
                type: 'Valid',
                data: book,
            });
        } else {
            res.json({
                type: 'Invalid',
            });
        }
    },

    async getFavorite(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const book = await bookModel.loadFavorite(page, limit);

        if (book.length > 0) {
            return res.json({
                type: 'Valid',
                data: book,
            });
        }

        return res.json({
            type: 'Invalid',
        });
    },

    async getReviews(req, res) {
        const bookId = req.params.id;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const posts = await readerModel.loadPostsByBookId(page, limit, bookId);

        if (post.length == 0)
            return res.json({ type: 'Invalid', err: 'endoflist' });

        if (posts.length > 0) return res.json({ type: 'Valid', data: posts });

        return res.json({ type: 'Invalid', err: 'error occured' });
    },
};
