const ReaderModel = require('../models/reader.model');
const UserModel = require('../models/user.model');
module.exports.login = async (req, res) => {
    console.log(req.body);
    if (!req.body.password) {
        res.json({ type: 'Invalid' });
        return;
    }

    const { err, status, data } = await UserModel.loginUser(req.body);

    if (err) return res.json({ type: 'Invalid', err });
    if (status == 'Fail') return res.json({ type: 'Valid', status });
    if (data) return res.json({ type: 'Valid', status: 'Success', data });
};

module.exports.signup = async (req, res) => {
    console.log(req.body);
    if (
        !req.body.password ||
        !req.body.email ||
        req.body.password.length < 6 ||
        req.body.email.indexOf('@') == -1
    ) {
        return res.json({ type: 'Invalid' });
    }

    const { data, err } = await UserModel.createUser({
        email: req.body.email,
        password: req.body.password,
    });

    if (err) return res.json({ type: 'Valid', status: 'Fail', err });

    return res.json({ type: 'Valid', status: 'Success', data });
};

module.exports.addToWishList = async (req, res) => {
    if (!req.body.bookId)
        return res.json({ type: 'Invalid', err: 'bookId required' });

    const { data, err } = await UserModel.addToWishList(
        req.headers.id,
        req.body.bookId
    );

    if (err) return res.json({ type: 'Invalid', err });

    if (data) return res.json({ type: 'Valid', data });
};

module.exports.getWishList = async (req, res) => {
    const { data, err } = await UserModel.loadWishList(req.headers.id);

    if (err) return res.json({ type: 'Invalid', err });

    if (data) return res.json({ type: 'Valid', data });
};

// module.exports.likePost = async function (req, res) {
//     const { postId } = req.body;
//     console.log(postId);

//     if (!postId)
//         return res.json({
//             type: 'Invalid',
//             err: 'postId are required',
//         });

//     const reader = await ReaderModel.addToLikeList(req.headers.id, postId);
//     if (reader.err) res.json({ err: reader.err });

//     const user = await UserModel.addToLikedPosts(req.headers.id, postId);
//     if (user.err) return res.json({ type: 'Invalid', err: user.err });
//     if (user.data) return res.json({ type: 'Valid', data: user.data });
// };

// module.exports.removeFromLikeList = async function (req, res) {
//     const { postId } = req.body;
//     console.log(postId);

//     if (!postId)
//         return res.json({
//             type: 'Invalid',
//             err: 'postId are required',
//         });

//     const reader = await ReaderModel.removeFromLikeList(req.headers.id, postId);
//     if (reader.err) return res.json({ type: 'Invalid', err: reader.err });

//     const user = await UserModel.removeFromLikedPosts(req.headers.id, postId);
//     if (user.err) return res.json({ type: 'Invalid', err: user.err });
//     if (user.data) return res.json({ type: 'Valid', data: user.data });
// };
