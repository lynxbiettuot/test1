const dashBoradRoute = require("./dashboard.route.js");//Nhúng file home_route vào file này

module.exports = (app) => {
    const path_admin = "/admin";
    app.use(path_admin + "/dashboard", dashBoradRoute); 
}