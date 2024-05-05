const express = require("express");//Lấy dữ liệu từ biến express

const route = express.Router();//tạo 1 route tên express

//Nhungs file trong home_controller

const controller = require("../../controller/client/cart.controller.js");

route.post("/add/:productId",controller.addPost);

module.exports = route;