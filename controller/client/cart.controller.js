const Cart = require("../../models/carts.model");
//[POST] /cart/add/:productId
module.exports.addPost = async (req,res) => {
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);
    const cartId = req.cookies.cartId;

    try{
        const cart = await Cart.findOne({
            _id: cartId
        });

        console.log(cart);

        const existProductInCart = cart.products.find(item => item.product_id == productId);
        
        if(existProductInCart) {
            const quantityUpdate = existProductInCart.quantity + quantity;
            
            await Cart.updateOne({
                _id: cartId,
                "products.product_id": productId
            }, {
                $set: {"products.$.quantity": quantityUpdate}// tim va update id de khong tao ra ban sao moi
            });
        }else {
            const objectCart = {
                product_id: productId,
                quantity: quantity,
            };

            await Cart.updateOne({
                _id: cartId
            }, {
                $push: { products: objectCart}// đẩy phần tử vào mảng
            });
        }

        req.flash("success", "Đã thêm sản phẩm vào giỏ hàng.");
    }catch (error){
        req.flash("erorr", "Thêm sản phẩm vào giỏ hàng không thành công");
    }
    res.redirect("back");
}
