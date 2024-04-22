const systemConfig = require("../../config/system");
const Account = require("../../models/account.model");
const Role = require("../../models/role.model");


module.exports.requireAuth = async (req, res, next) => {
    //Kiểm tra xem có cookies hay không
    if(!req.cookies.token) {
        res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
        return;
    }

    const user = await Account.findOne({
        token: req.cookies.token,
        deleted: false,
        status: "active"
    });

    if(!user) {
        //Nếu gửi sai->xóa token
        res.clearCookie("token");
        res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
        return;
    }

    const role = await Role.findOne({
        _id: user.role_id,
        deleted: false
    });

    res.locals.user = user;// Trả ra local biến user để dùng trong pug
    res.locals.role = role;// Trả ra local biến role để dùng trong pug
    console.log(user.fullName);
    console.log(role);
    next();
}