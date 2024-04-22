//Route chứa các vấn đề về bảo mật và xác thực
const express = require("express");
const router = express.Router();

const controller = require("../../controller/admin/authen.controller.js");

router.get("/login", controller.login);

router.post("/login", controller.loginPost);

module.exports = router;