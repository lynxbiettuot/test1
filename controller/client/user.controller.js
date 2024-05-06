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