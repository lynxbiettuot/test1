//[GET] /admin/my-account
module.exports.index = (req, res) => {
    res.render("admin/page/my-account/index.pug", {
        pageTitle : "Trang thông tin cá nhân"
    });
}