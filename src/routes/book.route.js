const express = require("express");
const router = express.Router();
const bookController = require("../app/controllers/book.controller.js");
const userAuthentication = require("../app/middleware/userauthentication.middleware");
router.post("/push", userAuthentication, bookController.push);
router.get("/get", userAuthentication, bookController.get);

module.exports = router;
