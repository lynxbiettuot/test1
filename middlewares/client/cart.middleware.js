const Cart = require("../../models/carts.model");

module.exports.cart = async (req, res, next) => {
    if(!req.cookies.cartId) {
        const cart = new Cart();//Tạo 1 giỏ hàng rỗng
        await cart.save();// Lưu vào db
        
        res.cookie("cartId",cart.id);//Trả về front-end cookie
    }else {
        const cart = await Cart.findOne({
            _id: req.cookies.cartId
        });
        
        res.locals.miniCart = cart;
    }
    next();
}