const  ProductCategory = require("../../models/product-category.model.js");
const systemConfig = require("../../config/system.js");
const createTreeHelper = require("../../helpers/createTree.helper.js");

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
    const records = await ProductCategory.find({
        deleted: false
    });

    // function createTree(arr, parentId = "") {
    //     const tree = [];
    //     arr.forEach((item) => {
    //       if (item.parent_id === parentId) {
    //         const children = createTree(arr, item.id);
    //         if (children.length > 0) {
    //           item.children = children;
    //         }
    //         tree.push(item);
    //       }
    //     });
    //     return tree;
    // }

    const newRecords = createTreeHelper(records);//Ham tao cay long nhau

    res.render("admin/page/product-category/create.pug", {
        pageTitle : "Thêm danh mục mới sản phẩm",
        records: newRecords
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