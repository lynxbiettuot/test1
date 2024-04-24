const Product = require("../../models/product.model.js");//Nhung file product.model.js
const productCategory = require("../../models/product-category.model.js");//Nhung file product.model.js

//[GET] / product
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

// [GET] producst/:slugCategory                             
module.exports.slugCategory = async (req, res) => {
    const slugCategory = req.params.slugCategory;

    const category = await productCategory.findOne({
        slug: slugCategory,
        deleted: false,
        status: "active"
    });
    
    const products = await Product.find({    
        product_category_id: category.id,
        deleted: false,
        status: "active"
    }).sort({ position : "desc" });

    for(const item of products) {
        item.newPrice = (item.price * (100 - item.discountPercentage) /100).toFixed();
    }

    res.render("client/pages/products/index.pug", {
        pageTitle : category.title,
        products : products//tra ra ngoai giao dien biến products chứa kiểu dữ liệu là mảng products
    });
}

module.exports.detail = async (req, res) => {
    //Viết logic để vào model lấy database
    const slug = req.params.slug;

    const product = await Product.findOne({
        slug: slug,
        deleted: false,
        status: "active"
    });

    if(product) {
        res.render("client/pages/products/detail", {
            pageTitle : "Chi tiết sản phẩm",
            product: product
        });
    }else {
        res.redirect("back");
    }
}