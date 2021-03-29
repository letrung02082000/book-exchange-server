const PostLikeModel = require('../models/post.like.model');
const PostCommentModel = require('../models/post.comment.model');

module.exports = {
    async likePost(req, res) {
        const { postId } = req.body;
        const userId = req.headers.id;

        if (!postId)
            return res.json({ type: 'Invalid', err: 'postId required' });

        const { data, err } = await PostLikeModel.addPostLike(postId, userId);

        if (err) return res.json({ type: 'Invalid', err });
        if (data) return res.json({ type: 'Valid', data });
    },

    async removeLike(req, res) {
        const { postId } = req.body;
        const userId = req.headers.id;

        if (!postId)
            return res.json({ type: 'Invalid', err: 'postId required' });

        const { data, err } = await PostLikeModel.removePostLike(
            postId,
            userId
        );

        if (err) return res.json({ type: 'Invalid', err });
        if (data) return res.json({ type: 'Valid', data });
    },

    async commentPost(req, res) {
        const { postId, comment } = req.body;
        const userId = req.headers.id;

        if (!postId)
            return res.json({ type: 'Invalid', err: 'postId required' });

        if (!comment)
            return res.json({ type: 'Invalid', err: 'comment required' });

        const { data, err } = await PostCommentModel.addPostComment(
            postId,
            userId,
            comment
        );

        if (err) return res.json({ type: 'Invalid', err });
        if (data) return res.json({ type: 'Valid', data });
    },

    async removeComment(req, res) {
        const { postId, commentId } = req.body;
        const userId = req.headers.id;

        if (!postId)
            return res.json({ type: 'Invalid', err: 'postId required' });

        if (!commentId)
            return res.json({ type: 'Invalid', err: 'commentId required' });

        const { data, err } = await PostCommentModel.removePostComment(
            postId,
            userId,
            commentId
        );

        if (err) return res.json({ type: 'Invalid', err });
        if (data) return res.json({ type: 'Valid', data });
    },

    // async getLike(req, res){

    // },

    async getComment(req, res) {
        const postId = req.query.post;
        const { data } = await PostCommentModel.loadComment(postId);

        if (data) return res.json({ type: 'Valid', data });
    },
};
