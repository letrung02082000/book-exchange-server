const express = require("express");
const router = express.Router();
const userRoute = require("./user.route");
const bookRoute = require("./book.route");
router.use("/user", userRoute);
router.use("/book", bookRoute);

module.exports = router;
