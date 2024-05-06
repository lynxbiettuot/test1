const express = require("express");
const route = express.Router();

const controller = require("../../controller/client/user.controller");

route.get("/register", controller.register);

route.post("/register", controller.registerPost);

route.get("/login", controller.login);

route.post("/login", controller.loginPost);

route.get("/logout", controller.logout);

route.get("/password/forgot", controller.forgotPassword);

route.post("/password/forgot", controller.forgotPasswordPost);

module.exports = route;