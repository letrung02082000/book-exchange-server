const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const readerSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    book: { type: Schema.Types.ObjectId, required: true, ref: 'book' },
    pending: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
    title: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true },
});

const ReaderModel = mongoose.model('reader', readerSchema);

module.exports = {
    async findPostById(id) {
        return await ReaderModel.findById(id);
    },

    loadAllPosts(page, limit) {
        return ReaderModel.find()
            .populate({ path: 'user', select: ['avt', 'name', 'username'] })
            .sort({ date: -1 })
            .populate('book')
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();
    },

    loadPostsByBookId(page, limit, bookId) {
        return ReaderModel.find({ book: mongoose.Types.ObjectId(bookId) })
            .populate({ path: 'user', select: ['avt', 'username', 'name'] })
            .sort({ date: -1 })
            .populate('book')
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();
    },

    async createPost(post) {
        const checkPost = await ReaderModel.find({
            user: post.user,
            book: post.book,
        });

        if (checkPost.length > 0) return { err: 'post exist' };

        let newPost = new ReaderModel(post);
        let err = newPost.validateSync();
        console.log(err);

        if (err) return { err: 'validate error' };

        await newPost.save();
        return { data: newPost };
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
