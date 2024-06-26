const Product = require("../../models/product.model");
//[GET] / home
module.exports.index = async (req, res) => {
    const featureProduct = await Product.find({
        deleted: false,
        status: "active",
        featured: "1"
    }).limit(6).select("-description");//giơi hạn lấy 2 sp

    for(const product of featureProduct) {
        product.priceNew = (product.price * (100 - product.discountPercentage)/100).toFixed(0);
    }

    const newProduct = await Product.find({
        deleted: false,
        status: "active",
        featured: "1"
    }).sort({position : "desc" }).limit(6).select("-description");//giơi hạn lấy 2 sp

    for(const product of newProduct) {
        product.priceNew = (product.price * (100 - product.discountPercentage)/100).toFixed(0);
    }

    res.render("client/pages/home/index.pug",{
        pageTitle: "Trang chủ",
        featureProduct: featureProduct,
        newProduct: newProduct
    }); 
}