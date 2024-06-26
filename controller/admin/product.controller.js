//[GET] /admin/products
const Product = require("../../models/product.model.js");
const ProductCategory = require("../../models/product-category.model.js");
const Account = require("../../models/account.model.js");
const filterHelper = require("../../helpers/filter.helper.js");
const paginationHelper = require("../../helpers/pagination.helper.js");
const { isObjectIdOrHexString } = require("mongoose");
const systemConfig = require("../../config/system.js");
const createTreeHelper = require("../../helpers/createTree.helper.js");

//[GET] /admin/products/
module.exports.index = async (req, res) => {
    //Lấy data
    // console.log(req.query);// Sau dau '?'
    const find = {
        deleted: false
    }
//Filter

    const filterStatus = filterHelper(req);

    if(req.query.status) {
        find.status = req.query.status;
    }
//Filter
    

//Search
    if(req.query.keyword) {
        // xem doc cua regex
        const regex = new RegExp(req.query.keyword, "i");
        find.title = regex;
    }

//End search

//Pagination-Phân trang

    const countRecords = await Product.countDocuments(find);
    const objectPagination = paginationHelper(req,countRecords);
//End-Kết thúc phân trang

//Sort
    const sort = {};
    if(req.query.sortKey && req.query.sortValue) {
        const sortKey = req.query.sortKey;
        const sortValue = req.query.sortValue;   

        sort[sortKey] = sortValue;
    }else {
        sort.position = "desc";
    }
//End-Sort

    //Giới hạn 4 phần tử khi dùng limit và bỏ qua 4 phần tử đầu khi dùng skip là hai hàm có sẵn
    const products = await Product
    .find(find)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip)
    .sort(sort);

    for(const product of products) {
        const createdBy = await Account.findOne({
            _id: product.createdBy
        });
        if(createdBy) {
            product.createdByFullName = createdBy.fullName;
        }
    }

    res.render("admin/page/products/index.pug", {
        pageTitle : "Trang danh sách sản phẩm",
        products : products,
        filterStatus: filterStatus,
        keyword: req.query.keyword,
        objectPagination: objectPagination
    });
}

//[PATCH] /admin/products/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status
    const id = req.params.id
    //Update database
    await Product.updateOne({
        //object 1 la truyen vao key muon tim
        _id: id,
    },{
        //object2 la chua data update
        status: status
    });
    //key, Nội dung thông báo
    req.flash('success', 'Cập nhật trạng thái thành công!');

    res.redirect(`back`);
}

//[PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    //Tất cả các giá trị người dùng nhập trong form sẽ luôn ở trong req.body
    const type = req.body.type;
    let ids = req.body.ids;
    ids = ids.split(", ");

    switch(type) {
        case "active":
            await Product.updateMany({
                //object 1 la truyen vao key muon tim
                _id: { $in: ids }
            },{
                //object2 la chua data update
                status: type
            }); 
            break;
        case "inactive":
            await Product.updateMany({
                //object 1 la truyen vao key muon tim
                _id: { $in: ids }
            },{
                //object2 la chua data update
                status: type
            }); 
            break;
        case "delete-all":
            await Product.updateMany ({
                _id: { $in : ids}
            },{
                deleted: true,
                deletedAt: new Date(),
                deletedBy: res.locals.user.id,
            });
            break;
        case "change-position":
            for(const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);
                
                await Product.updateOne({
                    _id: id
                },{
                    position: position //Biến data-Tự định nghĩa
                });
            }
            break;
        default:
            break;
    }

    res.redirect(`back`);
} 

//[DELETE] /admin/products/delete/:id
module.exports.deleteItem= async (req, res) => {
    const id = req.params.id;

    await Product.updateOne({
        _id: id
    },{
        //Update de xoa mem
        deleted: true,
        deletedAt: new Date(),
        deletedBy: res.locals.user.id,
    });

    res.redirect("back");
} 

//[GET] /admin/products/create
module.exports.create = async (req, res) => {
    const category = await ProductCategory.find({
        deleted: false
    });

    const newCategory = createTreeHelper(category);

    res.render("admin/page/products/create" , {
        pageTitle: "Thêm mới sản phẩm",
        category: newCategory
    });
}

//[POST] /admin/products/create
module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if(req.body.position) {
        req.body.position = parseInt(req.body.position);
    }else {
        const countProduct = await Product.countDocuments();
        req.body.position = countProduct + 1;
    }

    //Tạo một trường mới là id người thêm sản phẩm
    req.body.createdBy = res.locals.user.id;
    
    //Khoi tao sp
    const record = new Product(req.body);
    //Luu 1 sp vao database
    await record.save();

    req.flash("success", "Thêm mới sản phẩm thành công");
    res.redirect(`/${systemConfig.prefixAdmin}/products`);
}

// [GET] / admin/products/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;

    const product = await Product.findOne({
        _id: id,
        deleted: false
    });

    const category = await ProductCategory.find({
        deleted: false
    });

    const newCategory = createTreeHelper(category);

    res.render("admin/page/products/edit", {
        pageTitle: "Chỉnh sửa sản phẩm",
        product: product,
        category: newCategory
    });
}

//[PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;

    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);
    req.body.updatedBy = res.locals.user.id;

    // //Khoi tao sp
    await Product.updateOne({
        _id: id,
        deleted: false 
    },req.body);
    req.flash("success", "Chỉnh sửa sản phẩm thành công");
    res.redirect(`back`);
}

//[GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id;

    const product = await Product.findOne({
        _id: id,
        deleted: false
    });

    res.render("admin/page/products/detail", {
        pageTitle: `Chi tiết ${product.title}`,
        product: product
    });
}