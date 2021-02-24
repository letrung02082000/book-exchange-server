const router = require("express")();
const controller = require("../app/controllers/admin.controller");
const adminAuth = require("../app/middleware/adminAuth");

router.post("/login", controller.login);
router.post("/changepassword", adminAuth, controller.changepassword);
module.exports = router;
