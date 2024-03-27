const express = require("express");//Lấy dữ liệu từ biến express

const route = express.Router();//tạo 1 route tên express

//Nhungs file trong home_controller

const controller = require("../../controller/client/home_controller.js");

route.get("/",controller.index);

module.exports = route;