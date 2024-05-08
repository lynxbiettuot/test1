const User = require("../../models/user.model.js");
const forgotPassword = require("../../models/forgot-password.model.js");
const ForgotPassword = require("../../models/forgot-password.model.js");
const md5 = require("md5");

const generateHelper = require("../../helpers/generate.helper.js");
const sendEmailHelper = require("../../helpers/sendemail.js");


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

// [GET] /user/password/forgot
module.exports.forgotPassword = async (req, res) => {
    res.render("client/pages/user/forgot-password", {
      pageTitle: "Lấy lại mật khẩu",
    });
};

//[POST] /user/password/forgotPasswordPost
module.exports.forgotPasswordPost = async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({
        email: email,
        deleted: false
    });

    if(!user) {
        req.flash("error", "Email không tồn tại");
        res.redirect("back");
        return;
    } 
    //Việc 1: tạo và lưu mã otp trong database
    const otp = generateHelper.generateRandomNumber(6);

    const objectForgotPassword = {
        email: email,
        otp: otp,
        expireAt: Date.now() + 3*60*1000,//Chuyen qua tich tac
    }

    const forgotpassword = new forgotPassword(objectForgotPassword);
    await forgotpassword.save();

    //Việc 2: gửi mã otp cho gmail
    const subject = "Lấy lại mật khẩu";
    const text = `Mã OTP xác thực tài khoản của bạn là: ${otp}.Vui lòng không cung cấp với bất kì ai!`;
    sendEmailHelper.sendEmail(email,subject,text);

    res.redirect(`/user/password/otp?email=${email}`);
};

// [GET] /user/password/otp
module.exports.otpPassword = async (req, res) => {
    const email = req.query.email

    console.log(email);

    res.render("client/pages/user/otp-password", {
      pageTitle: "Nhập mã OTP:",
      email: email
    });
};

// [POST] /user/password/otp
module.exports.otpPasswordPost = async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;

    const result = await ForgotPassword.findOne({
        email: email,
        otp: otp
    });

    if(!result) {
        req.flash("error", "Mã OTP không hợp lệ!");
        res.redirect("back");
        return;
    }

    const user = await User.findOne({
        email: email,
    });

    res.cookie("tokenUser",user.tokenUser);

    res.redirect("/user/password/reset");
};

// [GET] /user/password/reset
module.exports.resetPassword= async (req, res) => {
    res.render("client/pages/user/reset-password", {
        pageTitle: "Đổi mật khẩu"
    });
};

// [POST] /user/password/reset
module.exports.resetPasswordPost= async (req, res) => {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const tokenUser = req.cookies.tokenUser;

    if(password != confirmPassword) {
        req.flash("error", "Xác nhận mật khẩu không khớp");
        res.redirect("back");
        return;
    }

    await User.updateOne({
        tokenUser: tokenUser
    }, {
        password: md5(password) 
    });
    req.flash("success", "Đổi mật khẩu thành công");
    res.redirect("/");
};

// [GET] /user/info
module.exports.info= async (req, res) => {
    const infoUser = await User.findOne({
        tokenUser: req.cookies.tokenUser,
        deleted: false
    }).select("-password");

    console.log(infoUser);

    res.render("client/pages/user/info", {
        pageTitle: "Thông tin tài khoản",
        infoUser: infoUser
    });
};
