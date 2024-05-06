const User = require("../../models/user.model.js");
const md5 = require("md5");
const generateHelper = require("../../helpers/generate.helper.js");

//[GET] /user/register
module.exports.register = async (req, res) => {
    res.render("client/pages/user/register.pug", {  
        pageTitle: "Đăng kí tài khoản"
    });
}

//[POST] /user/register
module.exports.registerPost = async (req, res) => {
    const existUser = await User.findOne({
        email: req.body.email,
        deleted: false
    });

    if(existUser) {
        req.flash("error", "Email đã tồn tại");
        res.redirect(`back`);
        return;
    }

    const userInfo = {
        email: req.body.email,
        fullName: req.body.fullName,
        password: md5(req.body.password),
        tokenUser: generateHelper.generateRandomString(30)
    };

    const newUser = new User(userInfo);
    await newUser.save();

    res.cookie("tokenUser", newUser.tokenUser);

    res.redirect(`/`);
}

//[GET] /user/login
module.exports.login = async (req, res) => {
    res.render("client/pages/user/login.pug", {  
        pageTitle: "Đăng nhập tài khoản"
    });
}

//[POST] /user/login
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
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

    if(user.status != "active") {
        req.flash("error", "Tài khoản đang bị khóa hoặc bảo trì");
        ré.redirect("back");
        return;
    }

    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/");
}

//[GET] /user/logout
module.exports.logout = async (req,res) => {
    res.clearCookie("tokenUser");//Cau lenh xoa cookie ten tokenUser
    res.redirect("/");
}