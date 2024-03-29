const express = require("express");
const dotenv = require("dotenv");
const Database = require("./config/database.js");// Lấy dữ liệu với database
const systemConfig = require("./config/system.js");  
dotenv.config();

Database.connect();//Kết nối với db

const routeAdmin = require("./routes/admin/index.route.js");
const routeClient = require("./routes/clients/index_route.js");

const app = express();
const port = process.env.PORT;//Bao mat bien port

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'))
 
// app local variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;//Dùng bất cứ đâu cũng được

//Route
routeAdmin(app);
routeClient(app);

app.listen(port, () => {
    console.log(`App listen on port ${port}`);
});