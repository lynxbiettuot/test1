const express = require("express");//Lấy dữ liệu từ biến express
const multer = require('multer');//định nghĩa multer up ảnh
const route = express.Router();//tạo 1 route tên route

const storage = require("../../helpers/storagemulter.helper.js");
  
const upload = multer({ storage: storage });
// const upload = multer({ dest: './public/uploads/' });

//Nhungs file trong dashboard.controller owr controller
  
const controller = require("../../controller/admin/product.controller.js");

const validate = require("../../validate/admin/product.validate.js");

route.get("/",controller.index);// Dấu / mặc định là vào trang /admin/dashboard vì bên index đã có export

route.patch("/change-status/:status/:id",controller.changeStatus);//Dấu : thể hiện param động

route.patch("/change-multi",controller.changeMulti);

route.delete("/delete/:id",controller.deleteItem);

route.get("/create",controller.create);

route.post(
    "/create", 
    upload.single('thumbnail'),
    validate.createPost,
    controller.createPost
);

route.get("/edit/:id",controller.edit);

route.patch(
    "/edit/:id", 
    upload.single('thumbnail'),
    validate.createPost,
    controller.editPatch
);

module.exports = route; 