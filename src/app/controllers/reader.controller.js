const mongoose = require('mongoose');
const ReaderModel = require('../models/reader.model');

module.exports = {
    async query(req, res) {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;

        const post = await ReaderModel.loadAllPosts(page, limit);

        if (post.length > 0) return res.json({ type: 'Valid', data: post });
        return res.json({ type: 'Invalid', err: 'No post found!' });
    },

    async addPost(req, res) {
        const post = {
            book: mongoose.Types.ObjectId(req.body.book),
            user: mongoose.Types.ObjectId(req.body.user),
            content: req.body.content,
            title: req.body.title,
        };
        const { data, err } = await ReaderModel.createPost(post);

        if (data) return res.json({ type: 'Valid', data });
        else if (err) return res.json({ type: 'Invalid', err });
    },
};
