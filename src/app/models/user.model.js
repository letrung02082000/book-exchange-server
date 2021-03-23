const mongoose = require('mongoose');
const md5 = require('md5');
const randomstring = require('randomstring');

const bookModel = require('./book.model');
const ReaderModel = require('./reader.model');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String },
    username: { type: String },
    likedposts: [{ type: mongoose.Types.ObjectId, ref: 'reader' }],
    wishlist: [{ type: mongoose.Types.ObjectId, ref: 'book' }],
});

const UserModel = mongoose.model('user', userSchema);

module.exports = {
    async findUserById(id) {
        return await UserModel.findById(id);
    },

    async loginUser(user) {
        let data;

        if (user._id) {
            data = await UserModel.findById(user._id);
        }

        data = await UserModel.findOne({ email: user.email });

        if (!data) {
            return { err: 'user not found' };
        }

        if (data.password != md5(user.password)) {
            return { status: 'Fail' };
        }

        data.token = randomstring.generate({
            length: 30,
            charset: 'alphabetic',
        });

        await data.save();
        data.password = 'hidden';

        return { data };
    },

    async createUser(user) {
        const data = await UserModel.findOne({ email: user.email });

        if (data) {
            return { err: 'user exist' };
        }

        let token = randomstring.generate({
            length: 30,
            charset: 'alphabetic',
        });

        const newuser = new UserModel({
            email: user.email,
            password: md5(user.password),
            token: token,
        });

        await newuser.save();
        newuser.password = 'hidden';

        return { data: newuser };
    },

    async addToLikedPosts(userId, postId) {
        // const post = await ReaderModel.findPostById(postId);
        // if (!post) return { err: 'No post found' };

        const user = await UserModel.findById(userId);
        if (!user) return { err: 'no user found' };

        if (user.likedposts.includes(mongoose.Types.ObjectId(postId)))
            return { err: 'post liked' };

        user.likedposts.push(mongoose.Types.ObjectId(postId));
        const data = await user.save();

        if (data) return { data };

        return { err: 'error occured' };
    },

    async removeFromLikedPosts(userId, postId) {
        const user = await UserModel.findById(userId);
        if (!user) return { err: 'no user found' };

        if (user.likedposts.includes(mongoose.Types.ObjectId(postId))) {
            const tmp = user.likedposts.filter((item) => item != postId);
            user.likedposts = tmp;
            const data = await user.save();

            if (data) return { data };
        }

        return { err: 'error occured' };
    },

    async addToWishList(userId, bookId) {
        const user = UserModel.findById(userId);
        if (!user) return { err: 'no user found' };

        const book = bookModel.loadBookById(bookId);
        if (!book) return { err: 'no book found' };

        user.wishlist.push(mongoose.Types.ObjectId(bookId));
        const data = await user.save();

        if (!data) return { err: 'error occured' };
        return { data };
    },
};
