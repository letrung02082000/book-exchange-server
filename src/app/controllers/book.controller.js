const bookModel = require('../models/book.model');
module.exports = {
    async getAllBooks(req, res) {
        //find book in db sorted by time push
        const allBooks = await bookModel.loadAllBooks();
        res.json({ type: 'Valid', data: allBooks });
    },

    async getBook(req, res) {
        const bookId = req.params.id;
        const book = await bookModel.loadBookById(bookId);
        res.json({ type: 'Valid', data: book });
    },
};
