//Tách route ra khỏi file chính nhưng cần tách route ra nhỏ hơn

const homeRoute = require("./home_route.js");//Nhúng file home_route vào file này
const productRoute = require("./product_route.js");
const categoryMiddleware = require("../../middlewares/client/category.middleware.js");

module.exports = (app) => {
    app.use(categoryMiddleware.category);// cú pháp thể hiện tất cả các trang đều có middlee ware

    app.use("/" , homeRoute);

    app.use("/products", productRoute); 

}