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
  const userInfo = req.body;

  console.log(userInfo);

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
    userInfo: userInfo,
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

//[GET] /checkout/success/:orderId
module.exports.success = async (req,res) => {
  try{
    const orderId = req.params.orderId;

    const order = await Order.findOne({
      _id: orderId
    });

    order.totalPrice = 0;

    for (const product of order.products) {
      const productInfor = await Product.findOne({
          _id: product.product_id
      });

      product.title = productInfor.title;
      product.thumbnail = productInfor.thumbnail;
      product.priceNew = (product.price * (100 - product.discountPercentage)/100).toFixed(0);
      product.totalPrice = product.priceNew * product.quantity;

      order.totalPrice += product.totalPrice;
    }

    console.log(order);

    res.render("client/pages/checkout/success", {
      pageTitle: "Đặt hàng thành công",
      order: order
    });
  }catch(error) {
    res.redirect("/");
  }
}