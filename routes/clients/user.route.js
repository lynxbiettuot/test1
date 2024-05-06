const express = require("express");
const route = express.Router();

const controller = require("../../controller/client/user.controller");

route.get("/register", controller.register);

route.post("/register", controller.registerPost);

module.exports = route;