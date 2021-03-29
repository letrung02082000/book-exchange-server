const mongoose = require('mongoose');
const readerModel = require('./reader.model');
const Schema = mongoose.Schema;

const postCommentSchema = new Schema({
    post: { type: Schema.Types.ObjectId, required: true, ref: 'reader' },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const PostCommentModel = mongoose.model('postcomment', postCommentSchema);

module.exports = {
    async addPostComment(postId, userId, comment) {
        const post = await readerModel.findPostById(postId);

        if (!post) return { err: 'post not found' };

        const newPostComment = new PostCommentModel({
            post: mongoose.Types.ObjectId(postId),
            user: mongoose.Types.ObjectId(userId),
            comment: comment,
        });

        await newPostComment.save();
        return { data: newPostComment };
    },

    async removePostComment(postId, userId, commentId) {
        const postComment = await PostCommentModel.find({
            post: mongoose.Types.ObjectId(postId),
            user: mongoose.Types.ObjectId(userId),
            _id: mongoose.Types.ObjectId(commentId),
        });

        if (!postComment) return { err: 'postcomment not found' };

        await PostLikeModel.deleteMany({
            post: mongoose.Types.ObjectId(postId),
            user: mongoose.Types.ObjectId(userId),
            _id: mongoose.Types.ObjectId(commentId),
        });

        return { data: postComment };
    },

    async loadComment(postId) {
        const postComment = await PostCommentModel.find({
            post: mongoose.Types.ObjectId(postId),
        })
            .populate('user', 'username')
            .sort({ date: -1 })
            .lean();
        return { data: postComment };
    },
};
