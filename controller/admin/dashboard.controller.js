//[GET] /admin/dashboard
module.exports.index = (req, res) => {
    res.render("admin/page/dashboard/index.pug", {
        pageTitle : "Trang chủ"
    });
}