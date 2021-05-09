const mongoose = require('mongoose');
const md5 = require('md5');
const randomstring = require('randomstring');

const bookModel = require('./book.model');
// const ReaderModel = require('./reader.model');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String },
    username: { type: String, unique: true },
    tel: { type: String },
    name: { type: String },
    address: { type: String },
    studentid: { type: String },
    avt: {
        type: String,
        default:
            'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png',
    },
    //likedposts: [{ type: mongoose.Types.ObjectId, ref: 'reader' }],
    wishlist: [{ type: mongoose.Types.ObjectId, ref: 'book' }],
    // eventlist: [{ type: mongoose.Types.ObjectId, ref: 'event' }],
});

const UserModel = mongoose.model('user', userSchema);

module.exports = {
    async findUserById(id) {
        return await UserModel.findById(id);
    },

    loadAllUsers() {
        return UserModel.find({}).lean();
    },

    async loginUser(user) {
        let data;

        // if (user._id) {
        //     data = await UserModel.findById(user._id);
        // }

        data = await UserModel.findOne({ email: user.email });
        console.log(data);
        if (!data) {
            return { err: 'user not found' };
        }

        if (data.password != md5(user.password)) {
            return { status: 'Fail' };
        }

        // data.token = randomstring.generate({
        //     length: 30,
        //     charset: 'alphabetic',
        // });

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

    async addToWishList(userId, bookId) {
        const user = await UserModel.findById(userId);
        if (!user) return { err: 'user not found' };

        const book = bookModel.loadBookById(bookId);
        if (!book) return { err: 'book not found' };

        if (user.wishlist.includes(mongoose.Types.ObjectId(bookId))) {
            return { err: 'book exist' };
        }

        user.wishlist.push(mongoose.Types.ObjectId(bookId));
        const data = await user.save();

        if (!data) return { err: 'error occured' };
        return { data: data.wishlist };
    },

    async loadWishList(userId) {
        const data = await UserModel.findById(userId)
            .populate('wishlist')
            .select({ wishlist: 1 });

        if (!data) return { err: 'user not found' };
        return { data };
    },

    async removeFromWishList(userId, bookId) {
        const user = await UserModel.findById(userId);
        if (!user) return { err: 'user not found' };

        let tmp = user.wishlist.filter((child) => child != bookId);
        user.wishlist = tmp;
        // console.log(tmp);
        await user.save();

        return { data: user.wishlist };
    },

    async updateUserInfo(userId, name, tel, address) {
        let user = await UserModel.findById(userId);

        if (!user) return { err: 'user not found' };

        user.name = name;
        user.tel = tel;
        user.address = address;

        let error = user.validateSync();

        if (error) return { err: 'validate fail' };

        await user.save();
        return { data: user };
    },

    async updateUsername(userId, username) {
        let oldUser = await UserModel.findById(userId);
        if (oldUser.username && oldUser.username.trim().length > 0)
            return { err: 'cannot change username' };

        let otherUser = await UserModel.exists({ username: username });
        // console.log(otherUser);
        if (otherUser) return { err: 'username exist' };

        oldUser.username = username;
        let err = oldUser.validateSync();

        if (err) return { err: 'validate fail' };

        await oldUser.save();
        return { data: oldUser };
    },

    // async addToLikedPosts(userId, postId) {
    //     // const post = await ReaderModel.findPostById(postId);
    //     // if (!post) return { err: 'No post found' };

    //     const user = await UserModel.findById(userId);
    //     if (!user) return { err: 'user not found' };

    //     if (user.likedposts.includes(mongoose.Types.ObjectId(postId)))
    //         return { err: 'post liked' };

    //     user.likedposts.push(mongoose.Types.ObjectId(postId));
    //     const data = await user.save();

    //     if (data) return { data };

    //     return { err: 'error occured' };
    // },

    // async removeFromLikedPosts(userId, postId) {
    //     const user = await UserModel.findById(userId);
    //     if (!user) return { err: 'user not found' };

    //     if (user.likedposts.includes(mongoose.Types.ObjectId(postId))) {
    //         const tmp = user.likedposts.filter((item) => item != postId);
    //         user.likedposts = tmp;
    //         const data = await user.save();

    //         if (data) return { data };
    //     }

    //     return { err: 'error occured' };
    // },

    // async addToEventList(userId, eventId) {
    //     const user = UserModel.findById(userId);
    //     if (!user) return { err: 'user not found' };

    //     console.log(user.eventlist);

    //     if (user.eventlist.includes(mongoose.Types.ObjectId()))
    //         return { err: 'event joined' };

    //     user.eventlist.push(mongoose.Types.ObjectId(eventId));
    //     await user.save();
    //     return { data: user };
    // },

    // async removeFromEventList(userId, eventId) {
    //     const user = UserModel.findById(userId);
    //     if (!user) return { err: 'user not found' };

    //     if (user.eventlist.includes(mongoose.Types.ObjectId(eventId))) {
    //         let tmp = user.eventlist.filter((child) => child != eventId);
    //         user.eventlist = tmp;
    //     }

    //     await user.save();
    //     return { data: user };
    // },
};
