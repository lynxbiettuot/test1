const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    product_category_id: String,
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
    createdBy: String,
    deletedBy: String,
    deletedAt: String,
    updatedBy: String,
    featured: {
        type: String,
        default: "0"
    }
},{
    //them hai thuoc tinh
    timestamps: true
});

const Product = mongoose.model('Product', 
productSchema, "products");

module.exports = Product;