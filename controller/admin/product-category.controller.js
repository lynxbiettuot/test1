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
    if(!res.locals.role.includes("products-category_create")) {
        res.send("Không có quyền truy cập");
        return;
    }
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

// [GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
    try {
      const find = {
        _id: req.params.id,
        deleted: false,
      };
  
      const data = await ProductCategory.findOne(find);
  
      const records = await ProductCategory.find({
        deleted: false,
      });
  
      const newRecords = createTreeHelper(records);
  
      res.render("admin/page/product-category/edit.pug", {
        pageTitle: "Chỉnh sửa danh mục sản phẩm",
        data: data,
        records: newRecords,
      });
    } catch (error) {
      res.redirect(`/${systemConfig.prefixAdmin}/product-category`);
    }
};

// [PATCH] /admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;

    req.body.position = parseInt(req.body.position);

    try{
        await ProductCategory.updateOne({_id: id}, req.body);
        req.flash("success", `Cập nhật danh mục thành công`);
    }catch(error) {
        req.flash("error", `Cập nhật danh mục không thành công`);
    }
    res.redirect("back");
};