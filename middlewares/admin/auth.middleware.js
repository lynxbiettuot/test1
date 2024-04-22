const systemConfig = require("../../config/system");
const Account = require("../../models/account.model");
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

    console.log(user);
    next();
}