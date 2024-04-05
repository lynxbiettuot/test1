const multer = require('multer');

module.exports = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/');//duong dan foleder luu file anh
    },
    filename: function (req, file, cb) {
        console.log(file);
        const fileName = Date.now() + "-" +file.originalname;
        cb(null, fileName);
    }
});
