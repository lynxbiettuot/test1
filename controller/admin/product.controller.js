//[GET] /admin/products
const Product = require("../../models/product.model.js");
const filterHelper = require("../../helpers/filter.helper.js");

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
    if(req.query.keyword) {
        // xem doc cua regex
        const regex = new RegExp(req.query.keyword, "i");
        find.title = regex;
    }
//Search


    const products = await Product.find(find);

    res.render("admin/page/products/index.pug", {
        pageTitle : "Trang danh sách sản phẩm",
        products : products,
        filterStatus: filterStatus,
        keyword: req.query.keyword
    });
}