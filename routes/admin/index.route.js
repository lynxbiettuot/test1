const dashBoardRoute = require("./dashboard.route.js");//Nhúng file home_route vào file này
const productRoute = require("./product.route.js");
const systemConfig = require("../../config/system");// Lấy ra biến trong cònfig

module.exports = (app) => {
    const path_admin = `/${systemConfig.prefixAdmin}`;
    app.use(path_admin + "/dashboard", dashBoardRoute);

    app.use(path_admin + "/products", productRoute);
}