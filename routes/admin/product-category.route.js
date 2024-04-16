const express = require("express");
const multer = require('multer');//định nghĩa multer up ảnh
const route = express.Router();//tạo 1 route tên route


const uploadCloud = require("../../middlewares/admin/uploadCloud.js");

const upload = multer();

//Nhungs file trong dashboard.controller owr controller
  
const controller = require("../../controller/admin/product-category.controller.js");

route.get("/",controller.index);// Dấu / mặc định là vào trang /admin/dashboard vì bên index đã có export

route.get("/create",controller.create);

route.post(
    "/create",
    upload.single('thumbnail'),
    uploadCloud.uploadSingle,
    controller.createPost
);

route.get("/edit/:id",controller.edit);

module.exports = route;