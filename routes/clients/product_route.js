const express = require("express");
const route = express.Router();

const controller = require("../../controller/client/product_controller.js");

route.get("/", controller.index);

route.get("/:slugCategory", controller.slugCategory);

route.get("/detail/:slug", controller.detail);

module.exports = route;