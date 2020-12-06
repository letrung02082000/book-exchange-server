const md5 = require("md5");

const randomstring = require("randomstring");
const userModel = require("../config/database/userSchema");
module.exports.login = async (req, res) => {
    console.log(req.body);
    if (!req.body.password) {
        res.json({ type: "Invalid" });
        return;
    }
    let user;
    if (req.body._id) {
        user = await userModel.findById(req.body._id);
    }
    user = await userModel.findOne({ email: req.body.email });
    if (!user) {
        res.json({ type: "Invalid" });
        return;
    }
    if (user.password != md5(req.body.password)) {
        res.send({ type: "Valid", status: "Fail" });
        return;
    }
    user.token = randomstring.generate({
        length: 30,
        charset: "alphabetic"
    });
    await user.save();
    user.password = "hidden";
    res.send({ type: "Valid", status: "Success", data: user });
};
module.exports.signup = async (req, res) => {
    console.log(req.body);
    if (
        !req.body.password ||
        !req.body.email ||
        req.body.password.length < 6 ||
        req.body.email.indexOf("@") == -1
    ) {
        res.json({ type: "Invalid" });
        return;
    }

    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
        res.send({ type: "Valid", status: "Fail" });
        return;
    }
    let token = randomstring.generate({
        length: 30,
        charset: "alphabetic"
    });
    newuser = new userModel({
        email: req.body.email,
        password: md5(req.body.password),
        token: token
    });

    await newuser.save();
    newuser.password = "hidden";
    res.send({ type: "Valid", status: "Success", data: newuser });
};
