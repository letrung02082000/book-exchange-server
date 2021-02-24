const { checkAdmin } = require("../models/admin.model");
module.exports = (req, res, next) => {
    console.log(req.signedCookies);
    //check admin
    if (req.signedCookies && checkAdmin(req.signedCookies.admin)) next();
    else res.json({ type: "RequireLogin" });
};
