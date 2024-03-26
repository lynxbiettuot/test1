const express = require("express");
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.get("/", (req, res) => {
    res.send("Trang chủ")
});

app.get("/products", (req, res) => {
    res.send("Danh sách sản phẩm")
});

app.listen(port, () => {
    console.log(`App listen on port ${port}`);
});