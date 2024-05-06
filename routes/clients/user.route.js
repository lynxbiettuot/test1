const express = require("express");
const route = express.Router();

const controller = require("../../controller/client/user.controller");

route.get("/register", controller.register);

route.post("/register", controller.registerPost);

route.get("/login", controller.login);

route.post("/login", controller.loginPost);

module.exports = route;