const passwordHash = require("password-hash");
const adminModel = require("../models/admin.model");
// console.log(passwordHash.generate("123456"));
module.exports.login = async (req, res) => {
    console.log(req.body);
    if (!req.body.username || !req.body.password)
        return res.json({ type: "Invalid" });
    const admin = await adminModel.findOne({ username: req.body.username });
    if (!admin) return res.send({ type: "Invalid" });
    let result = passwordHash.verify(req.body.password, admin.password);
    if (result) {
        res.cookie("admin", admin._id, {
            maxAge: 9000000,
            // httpOnly: true,
            signed: true
        });
        return res.json({ type: "Valid", status: "Success" });
    }
    return res.json({ type: "Valid", status: "Fail" });
};

module.exports.changepassword = async (req, res) => {
    // console.log(req.body);
    // if (!req.body.username || !req.body.password)
    //     return res.json({ type: "Invalid" });
    // let newpassword = await bcrypt.hash(req.body.password, salt);
    // console.log(newpassword);
    // let newadmin = new adminModel({
    //     username: req.body.username,
    //     password: newpassword
    // });
    // return res.json({ type: "Valid", data: newadmin });
};
