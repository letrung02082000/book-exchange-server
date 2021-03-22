const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const readerSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    book: { type: Schema.Types.ObjectId, required: true, ref: 'book' },
    pending: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
    likecount: { type: Number, required: true, default: 0 },
    title: { type: String, require: true },
    content: { type: String, require: true },
});

const ReaderModel = mongoose.model('reader', readerSchema);

module.exports = {
    loadAllPosts(page, limit) {
        return ReaderModel.find()
            .populate('user', 'username')
            .populate('book')
            .sort({ date: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
    },

    async createPost(post) {
        const data = await ReaderModel.create(post);

        if (data) return { data };
        return { err: 'Create post fail ' };
    },
};
