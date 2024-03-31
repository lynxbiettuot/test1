//[GET] /admin/products
const Product = require("../../models/product.model.js");

module.exports.index = async (req, res) => {
    //Lấy data
    const product = await Product.find({
        deleted : false
    });

    console.log(product);

    res.render("admin/page/products/index.pug", {
        pageTitle : "Trang danh sách sản phẩm",
        products : product
    });
}