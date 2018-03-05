const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//create product schema
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    cost:
    {
        type: Number,
        default: 1
    },
    quantity: {
        type: Number,
        default: 1
    }
});

//create a model and export
const Product = mongoose.model('product',productSchema);
module.exports = Product;