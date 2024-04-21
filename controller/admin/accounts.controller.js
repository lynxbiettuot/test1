var md5 = require('md5');// thư viện mã hóa password

const Account = require("../../models/account.model.js");
const Role = require("../../models/role.model.js");


const systemConfig = require("../../config/system.js");
const generateHelper = require("../../helpers/generate.helper.js");

// [GET] /admin/accounts/
module.exports.index = async (req, res) => {
  // Find
  let find = {
    deleted: false,
  };
  // End Find

  const records = await Account.find(find);

  for(const record of records) {
    const role = await Role.findOne({
      _id: record.role_id,
      deleted: false
    });

    record.roleTitle = role.title;
    console.log(role);
  }

  console.log(records);

  res.render("admin/page/accounts/index", {
    pageTitle: "Danh sách tài khoản",
    records: records,
  });
};

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
  const roles = await Role.find({
    deleted: false,
  });

  console.log(roles);

  res.render("admin/page/accounts/create.pug", {
    pageTitle: "Danh sách tài khoản",
    roles: roles
  });
};

// [POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
  req.body.password = md5(req.body.password);

  //Them mot bien cho mot object
  req.body.token = generateHelper.generateRandomString(30);// Tạo token 30 kí tự để lưu trong cookie

  const account = new Account(req.body);// tao moi mot database
  await account.save();// luu vao database Account

  res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
};
