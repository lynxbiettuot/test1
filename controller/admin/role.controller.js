const Role = require("../../models/role.model.js");

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