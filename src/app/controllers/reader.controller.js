const mongoose = require('mongoose');
const postLikeModel = require('../models/post.like.model');
const ReaderModel = require('../models/reader.model');

module.exports = {
    async query(req, res) {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const userId = req.headers.id || null;

        let post = await ReaderModel.loadAllPosts(page, limit);

        let newpost = [];

        for (let child of post) {
            child.postlike = false;
            const { data } = await postLikeModel.countPostLike(child._id);
            child.likecount = data.length;
        }

        if (userId) {
            for (let child of post) {
                const { data } = await postLikeModel.findPostLike(
                    child._id,
                    userId
                );

                // if (data && data.length > 0) {
                //     newchild = { ...child, postlike: true };
                // } else {
                //     newchild = { ...child, postlike: false };
                // }

                // newpost.push(newchild);
                if (data.length > 0) {
                    child.postlike = true;
                } else {
                    child.postlike = false;
                }
            }
        }

        if (post.length > 0) return res.json({ type: 'Valid', data: post });
        return res.json({ type: 'Invalid', err: 'No post found!' });
    },

    async addPost(req, res) {
        const rating = parseInt(req.body.rating);

        if (rating < 1 || rating > 5) {
            res.json({ type: 'Invalid', err: 'invalid rating' });
        }

        const post = {
            book: mongoose.Types.ObjectId(req.body.book),
            user: mongoose.Types.ObjectId(req.headers.id),
            content: req.body.content || null,
            title: req.body.title || null,
            rating: rating,
        };

        const { data, err } = await ReaderModel.createPost(post);

        if (data) return res.json({ type: 'Valid', data });
        else if (err) return res.json({ type: 'Invalid', err });
    },
};
