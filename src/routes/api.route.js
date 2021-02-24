const express = require("express");
const router = express.Router();
const userRoute = require("./user.route");
const bookRoute = require("./book.route");
const adminRoute = require("./admin.route");

router.use("/user", userRoute);
router.use("/book", bookRoute);

router.use("/admin", adminRoute);
module.exports = router;
