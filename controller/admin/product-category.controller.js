const  ProductCategory = require("../../models/product-category.model.js");
const systemConfig = require("../../config/system.js");

//[GET] /admin/product-category
module.exports.index = async (req, res) => {
    const records = await ProductCategory.find({
        deleted: false
    });

    console.log(records);

    res.render("admin/page/product-category/index.pug", {
        pageTitle : "Trang chủ",
        records: records
    });
}

//[GET] /admin/product-category/create
module.exports.create = async (req, res) => {
    res.render("admin/page/product-category/create.pug", {
        pageTitle : "Thêm danh mục mới sản phẩm"
    });
}

//[POST] /admin/product-category/create
module.exports.createPost = async (req, res) => {
    if(req.body.position) {
        req.body.position = parseInt(req.body.position);
    }else {
        const countProductCategory = await  ProductCategory.countDocuments();
        req.body.position = countProductCategory + 1;
    }
    //luu vao db
    const record = new ProductCategory(req.body);
    await record.save();

    res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
}