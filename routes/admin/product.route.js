const express = require("express");//Lấy dữ liệu từ biến express
const route = express.Router();//tạo 1 route tên route

//Nhungs file trong dashboard.controller owr controller
  
const controller = require("../../controller/admin/product.controller.js");

route.get("/",controller.index);// Dấu / mặc định là vào trang /admin/dashboard vì bên index đã có export

route.get("/:status/:id",controller.changeStatus);//Dấu : thể hiện param động

module.exports = route; 