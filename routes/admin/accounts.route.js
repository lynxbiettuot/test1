const express = require("express");
const route = express.Router();
const multer = require('multer');//định nghĩa multer up ảnh

const uploadCloud = require("../../middlewares/admin/uploadCloud.js");

const controller = require("../../controller/admin/accounts.controller.js");

const validate = require("../../validate/admin/account.validate.js");

const upload = multer();

route.get("/", controller.index);

route.get("/create", controller.create);

route.post(
    "/create",
    upload.single('avatar'),
    uploadCloud.uploadSingle,
    validate.createPost,
    controller.createPost
);
    
module.exports = route;