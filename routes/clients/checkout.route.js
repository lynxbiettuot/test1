const express = require("express");
const route = express.Router();

const controller = require("../../controller/client/checkout.controller.js");

route.get("/", controller.index);

route.post("/order", controller.order);

module.exports = route;