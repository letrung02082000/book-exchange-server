const mongoose = require('mongoose');
const UserModel = require('./user.model');
const Schema = mongoose.Schema;

const readerSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    book: { type: Schema.Types.ObjectId, required: true, ref: 'book' },
    pending: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
    // likelist: [{ type: Schema.Types.ObjectId }],
    title: { type: String, require: true },
    content: { type: String, require: true },
});

const ReaderModel = mongoose.model('reader', readerSchema);

module.exports = {
    async findPostById(id) {
        return await ReaderModel.findById(id);
    },

    loadAllPosts(page, limit) {
        return ReaderModel.find()
            .populate({ path: 'user', select: ['avt', 'username'] })
            .populate('book')
            .sort({ date: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();
    },

    async createPost(post) {
        const data = await ReaderModel.create(post);

        if (data) return { data };
        return { err: 'create post fail' };
    },

    // async addToLikeList(userId, postId) {
    //     const user = await UserModel.findUserById(userId);
    //     if (!user) return { err: 'user not found' };

    //     const post = await ReaderModel.findById(postId);
    //     if (!post) return { err: 'no post found' };

    //     if (post.likelist.includes(mongoose.Types.ObjectId(userId)))
    //         return { err: 'post liked' };

    //     post.likelist.push(mongoose.Types.ObjectId(userId));
    //     const data = await post.save();

    //     if (data) return { data };
    //     return { err: 'error occured' };
    // },

    // async removeFromLikeList(userId, postId) {
    //     const user = await UserModel.findUserById(userId);
    //     if (!user) return { err: 'user not found' };

    //     const post = await ReaderModel.findById(postId);
    //     if (!post) return { err: 'no post found' };

    //     if (post.likelist.includes(mongoose.Types.ObjectId(userId))) {
    //         const tmp = post.likelist.filter((item) => item != userId);
    //         post.likelist = tmp;
    //         const data = await post.save();

    //         if (data) return { data };
    //     }

    //     return { err: 'error occured' };
    // },
};
