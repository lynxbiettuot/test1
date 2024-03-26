const express = require("express");

const route = require("./routes/index_route.js");

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

//Route
route(app);

app.listen(port, () => {
    console.log(`App listen on port ${port}`);
});