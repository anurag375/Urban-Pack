const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const router = express.Router();
const userModel = require('../models/user-model');

router.get("/", (req, res) => {
    // res.render("index");
    // res.send('defaultttt');
    let error = req.flash("error"); // whatever "error" the "isLoggedIn" middleware sent here, is stored in "error"
    res.render("index", { error, loggedin: false }); // send the error to "index.ejs"
});

router.get("/shop", isLoggedIn, async (req, res) => {

    let products = await productModel.find();
    let success = req.flash("success");
    res.render("shop", { products, success });
});

router.get("/cart", isLoggedIn, async (req, res) => {
    res.render("cart");
});

router.get("/add-to-cart/:id", isLoggedIn, async (req, res) => {
    // Implementation for adding product to cart
    let user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.id);
    await user.save();
    req.flash("success", "Product added to cart");
    res.redirect("/shop");
});

module.exports = router;