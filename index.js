const express = require("express");
const dotenv = require("dotenv");
const Database = require("./config/database.js");// Lấy dữ liệu với database
const systemConfig = require("./config/system.js"); 
const methodOverride = require('method-override');
const bodyParser = require('body-parser');   
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const moment = require("moment");//Nhúng thư viện moment để dùng cục bộ vì không dùng được moment ở pug
dotenv.config();

Database.connect();//Kết nối với db

const routeAdmin = require("./routes/admin/index.route.js");
const routeClient = require("./routes/clients/index_route.js");

const app = express();
const port = process.env.PORT;//Bao mat bien port

//Flash
app.use(cookieParser('keyboard cat'));//key dat gi cung duoc
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
//endFlash

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// app local variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;//Dùng bất cứ đâu cũng được
app.locals.moment = moment;//Dùng bất cứ đâu cũng được

 /* New Route to the TinyMCE Node module */
 app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

//Route
routeAdmin(app);
routeClient(app);

app.listen(port, () => {
    console.log(`App listen on port ${port}`);
});