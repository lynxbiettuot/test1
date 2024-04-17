const dashBoardRoute = require("./dashboard.route.js");//Nhúng file home_route vào file này
const productRoute = require("./product.route.js");
const productCateGoryRoutes = require("./product-category.route.js");
const systemConfig = require("../../config/system");// Lấy ra biến trong cònfig
const roleRoutes = require("./role.route.js");

module.exports = (app) => {
    const path_admin = `/${systemConfig.prefixAdmin}`;
    app.use(path_admin + "/dashboard", dashBoardRoute);

    app.use(path_admin + "/products", productRoute);

    app.use(path_admin + "/products-category", productCateGoryRoutes);

    app.use(path_admin + "/roles", roleRoutes);
}
