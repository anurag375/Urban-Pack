const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/Urban-Pack');

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true
    },
    email: String,
    // email: { type: String, unique: true },
    password: String,
    cart: [{
        type: mongoose.Schema.Types.ObjectId,   // array type storing product id's
        ref: "product",
    }],
    // isadmin: Boolean,
    orders: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: String
});

module.exports = mongoose.model('user', userSchema);