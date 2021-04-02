const { checkAdmin } = require('../models/admin.model');
module.exports = async (req, res, next) => {
    console.log(req.signedCookies);
    //check admin
    if (req.signedCookies && (await checkAdmin(req.signedCookies.admin)))
        next();
    else res.json({ type: 'RequireLogin' });
};
