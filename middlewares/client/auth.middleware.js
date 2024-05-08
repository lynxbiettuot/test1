const User = require("../../models/user.model.js");

module.exports.requireAuth = async (req, res, next) => {
    //Kiểm tra xem có cookies hay không
    if(!req.cookies.tokenUser) {
        res.redirect(`/user/login`);
        return;
    }

    const user = await User.findOne({
        tokenUser: req.cookies.token,
        deleted: false,
        status: "active"
    }); 

    if(!user) {
        //Nếu gửi sai->xóa token
        res.clearCookie("tokenUser");
        res.redirect(`/user/login`);
        return;
    }

    const role = await Role.findOne({
        _id: user.role_id,
        deleted: false
    });

    next();
}