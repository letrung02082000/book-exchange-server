const { removeBookById, updateBookById } = require('../models/book.model');
const bookModel = require('../models/book.model');
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

    async getBooksPerPage(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const quantity = parseInt(req.query.quantity);

        try {
            let books = [];
            if (quantity == 0) {
                books = await bookModel.loadBookPerPageWithQuantity(
                    page,
                    limit
                );
            } else {
                books = await bookModel.loadBookPerPage(page, limit);
            }

            if (books.length > 0) {
                res.json({ type: 'Valid', data: books });
            } else {
                res.json({ type: 'Invalid' });
            }
        } catch (error) {
            console.log(error);
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
};
