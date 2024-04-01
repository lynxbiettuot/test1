//[GET] /admin/products
const Product = require("../../models/product.model.js");
const filterHelper = require("../../helpers/filter.helper.js");
const paginationHelper = require("../../helpers/pagination.helper.js");
const { isObjectIdOrHexString } = require("mongoose");

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
    //Giới hạn 4 phần tử khi dùng limit và bỏ qua 4 phần tử đầu khi dùng skip là hai hàm có sẵn
    const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);

    res.render("admin/page/products/index.pug", {
        pageTitle : "Trang danh sách sản phẩm",
        products : products,
        filterStatus: filterStatus,
        keyword: req.query.keyword,
        objectPagination: objectPagination
    });
}