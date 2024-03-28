const express = require("express");
const dotenv = require("dotenv");
dotenv.config()

const route = require("./routes/clients/index_route.js");

const app = express();
const port = process.env.PORT;//Bao mat bien port

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'))

//Route
route(app);

app.listen(port, () => {
    console.log(`App listen on port ${port}`);
});