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

    const getSubCategory = async (parent_id) => {
        let allSubs = [];

        const listSub = await ProductCategory.find({
            parent_id: parent_id,
            deleted: false,
            status: "active"
        }).select("id title");

        console.log(listSub);
        allSubs = [...listSub];

        for(const sub of listSub) {
            const childs = await getSubCategory(sub.id);
            allSubs = allSubs.concat(childs);
        }

        return allSubs;
    }

    const listSubCategory = await getSubCategory(category.id);
    console.log(listSubCategory);
    const listIdSubCategory = listSubCategory.map(item => item.id)
    
    const products = await Product.find({    
        product_category_id: { $in: [category.id, ...listIdSubCategory] },
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

    const category = await ProductCategory.findOne({
        _id: product.product_category_id,
        deleted: false,
        status: "active"
    });

    product.category = category;

    product.priceNew = (product.price * (100 - product.discountPercentage)/100).toFixed(0);

    if(product) {
        res.render("client/pages/products/detail", {
            pageTitle : product.title,
            product: product
        });
    }else {
        res.redirect("back");
    }
}