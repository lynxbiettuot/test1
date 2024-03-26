//Tách route ra khỏi file chính nhưng cần tách route ra nhỏ hơn

const homeRoute = require("./home_route.js");//Nhúng file home_route vào file này
const productRoute = require("./product_route.js");

module.exports = (app) => {
    app.use("/", homeRoute);

    app.use("/products", productRoute);
}