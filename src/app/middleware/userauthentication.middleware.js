const userModel = require("../config/database/userSchema");
module.exports = async (req, res, next) => {
    console.log(req.headers);
    if (!req.headers.id || !req.headers.token) {
        res.json({ type: "RequireLogin" });
        return;
    }
    const user = await userModel.findById(req.headers.id);
    console.log(user);
    if (!user) {
        res.json({ type: "RequireLogin" });
        return;
    }
    if (user.token == req.headers.token) {
        next();
        return;
    }
    res.json({ type: "RequireLogin" });
};
