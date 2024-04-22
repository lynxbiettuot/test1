const Account = require("../../models/account.model.js");
var md5 = require('md5');// thư viện mã hóa password

const systemConfig = require("../../config/system.js");

//[GET] /admin/auth/login
module.exports.login = async (req,res) => {
    res.render("admin/page/auth/login", {
        pageTitle: "Đăng nhập",
    });
}; 

//[POST] /admin/auth/login
module.exports.loginPost = async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await Account.findOne({
        email: email,
        deleted: false
    });

    if(!user) {
        req.flash("error", "Email không tồn tại");
        res.redirect("back");
        return; 
    }

    if(md5(password) != user.password) {
        req.flash("error", "Sai mật khẩu");
        res.redirect("back");
        return; 
    }

    if(user.status !== "active") {
        req.flash("error", "Tài khoản đã bị khóa");
        res.redirect("back");
        return; 
    }

    //Lưu token vào cookies để duy trì đăng nhập khi load lại trang
    //tên biến ,giá trị của token trong db
    res.cookie("token",user.token);

    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
}; 