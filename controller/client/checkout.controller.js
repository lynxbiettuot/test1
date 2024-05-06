const Cart = require("../../models/carts.model.js");
const Product = require("../../models/product.model.js");
const Order = require("../../models/order.model.js");

// [GET] /checkout/
module.exports.index = async (req, res) => {
  const cart = await Cart.findOne({
    _id: req.cookies.cartId
  });

  cart.totalPrice = 0;

  for (const item of cart.products) {
    const infoProduct = await Product.findOne({
      _id: item.product_id
    }).select("thumbnail title price discountPercentage stock slug");

    infoProduct.priceNew = (infoProduct.price * (100 - infoProduct.discountPercentage)/100).toFixed(0);

    infoProduct.totalPrice = infoProduct.priceNew * item.quantity;

    cart.totalPrice += infoProduct.totalPrice;

    item.infoProduct = infoProduct;
  }

  res.render("client/pages/checkout/index", {
    pageTitle: "Đặt hàng",
    cartDetail: cart
  });
};

//[POST] /checkout/order
module.exports.order = async (req, res) => {
  const cartId = req.cookies.cartId;
  const userInfor = req.body;

  const cart = await Cart.findOne({
    _id: cartId
  });

  const products = [];

  for (const item of cart.products) {
    const product = await Product.findOne({
      _id: item.product_id 
    });

    const objectProduct = {
      product_id: item.product_id,
      price: product.price,
      discountPercentage: product.discountPercentage,
      quantity: item.quantity,
    };

    products.push(objectProduct);
  }

  const dataOrder = {
    cart_id: cartId,
    userInfor: userInfor,
    products: products
  };

  //luu db
  const order = new Order(dataOrder);
  await order.save();
  //ket thuc luu

  await Cart.updateOne({
    _id: cartId,
  }, {
    products: []// Cap nhat o ben gio hang cac san pham da mua
  });
   res.redirect(`/checkout/success/${order.id}`);
}