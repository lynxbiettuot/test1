const Role = require("../../models/role.model.js");
const systemConfig = require("../../config/system.js");

// [GET] /admin/roles/
module.exports.index = async (req, res) => {
  // Find
  let find = {
    deleted: false,
  };
  // End Find

  const records = await Role.find(find);

  res.render("admin/page/roles/index", {
    pageTitle: "Nhóm quyền",
    records: records,
  });
};

// [GET] /admin/roles/create
module.exports.create = async (req, res) => {
    res.render("admin/page/roles/create", {
      pageTitle: "Thêm mới nhóm quyền",
    });
};

// [GET] /admin/roles/createPost
module.exports.createPost = async (req, res) => {
    const record = new Role(req.body);
    await record.save();
  
    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
};