const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    slug: { 
        type: String,
        //slug hien thi theo tieu de 
        slug: "title",
        unique: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
},{
    //them hai thuoc tinh
    timestamps: true
});

const Product = mongoose.model('Product', 
productSchema, "products");

module.exports = Product;