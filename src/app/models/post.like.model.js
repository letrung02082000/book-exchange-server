const mongoose = require('mongoose');
const readerModel = require('./reader.model');
const Schema = mongoose.Schema;

const postLikeSchema = new Schema({
    post: { type: Schema.Types.ObjectId, required: true, ref: 'reader' },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
});

const PostLikeModel = mongoose.model('postlike', postLikeSchema);

module.exports = {
    async findPostLike(postId, userId) {
        const postLike = await PostLikeModel.find({
            post: mongoose.Types.ObjectId(postId),
            user: mongoose.Types.ObjectId(userId),
        });

        return { data: postLike };
    },

    async addPostLike(postId, userId) {
        const post = await readerModel.findPostById(postId);

        if (!post) return { err: 'post not found' };

        const postLike = await PostLikeModel.find({
            post: mongoose.Types.ObjectId(postId),
            user: mongoose.Types.ObjectId(userId),
        });

        console.log(postLike);

        if (postLike.length > 0) return { err: 'post liked' };

        const newPostLike = new PostLikeModel({
            post: mongoose.Types.ObjectId(postId),
            user: mongoose.Types.ObjectId(userId),
        });

        await newPostLike.save();
        return { data: newPostLike };
    },

    async removePostLike(postId, userId) {
        const postLike = await PostLikeModel.find({
            post: mongoose.Types.ObjectId(postId),
            user: mongoose.Types.ObjectId(userId),
        });

        if (!postLike) return { err: 'postlike not found' };

        await PostLikeModel.deleteMany({
            post: mongoose.Types.ObjectId(postId),
            user: mongoose.Types.ObjectId(userId),
        });

        return { data: postLike };
    },
};
