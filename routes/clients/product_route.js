const express = require("express");
const route = express.Router();

const controller = require("../../controller/client/product_controller.js");

route.get("/", controller.index);

module.exports = route;