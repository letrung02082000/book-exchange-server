const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/user.controller.js");

router.post("/login", userController.login);
router.post("/signup", userController.signup);
// router.get("/", homeController.index);

module.exports = router;
