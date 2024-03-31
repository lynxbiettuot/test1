//[GET] /admin/products
const Product = require("../../models/product.model.js");

module.exports.index = async (req, res) => {
    //Lấy data
    // console.log(req.query);// Sau dau '?'

    const find = {
        deleted: false
    }

    const filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Không hoạt động",
            status: "inactive",
            class: ""
        }
    ];

    if(req.query.status) {
        const index = filterStatus.findIndex(item => item.status == req.query.status);
        //update class
        filterStatus[index].class = "active";
    }else {
        const index = filterStatus.findIndex(item => item.status == "");
        //update class
        filterStatus[index].class = "active";
    }

    console.log(filterStatus);

    if(req.query.status) {
        find.status = req.query.status;
    }

    const products = await Product.find(find);

    res.render("admin/page/products/index.pug", {
        pageTitle : "Trang danh sách sản phẩm",
        products : products,
        filterStatus: filterStatus
    });
}