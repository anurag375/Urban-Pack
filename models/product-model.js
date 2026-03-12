const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/Urban-Pack');

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    discount: {
        type: Number,
        default: 0
    },
    bgcolor: String,
    panelcolor: String,
    textcolor: String,
    image: String
});

module.exports = mongoose.model('product', productSchema);