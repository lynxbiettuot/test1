const Account = require("../../models/account.model.js");

// [GET] /admin/accounts/
module.exports.index = async (req, res) => {
  // Find
  let find = {
    deleted: false,
  };
  // End Find

  const records = await Account.find(find);

  res.render("admin/page/accounts/index", {
    pageTitle: "Danh sách tài khoản",
    records: records,
  });
};