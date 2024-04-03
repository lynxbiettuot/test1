//[GET] / product 
const Product = require("../../models/product.model.js");//Nhung file product.model.js

module.exports.index = async (req, res) => {
    //Viết logic để vào model lấy database
    const products = await Product.find({
        status : "active",//tim cac ban ghi co cac truong nhu dong 6 va 7
        deleted : false
    }).sort({ position : "desc" });// laay db bang ham find
    for(const item of products) {
        item.newPrice = (item.price * (100 - item.discountPercentage) /100).toFixed();
    }

    res.render("client/pages/products/index.pug", {
        pageTitle : "Danh sách sản phẩm",
        products : products//tra ra ngoai giao dien biến products chứa kiểu dữ liệu là mảng products
    });
}