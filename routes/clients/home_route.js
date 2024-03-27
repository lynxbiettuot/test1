const express = require("express");//Lấy dữ liệu từ biến express

const route = express.Router();//tạo 1 route tên express

route.get("/", (req, res) => {
    res.render("client/pages/home/index.pug");
});

module.exports = route;