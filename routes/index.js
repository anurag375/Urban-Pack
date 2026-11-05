const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const router = express.Router();

router.get("/", (req, res) => {
    // res.render("index");
    // res.send('defaultttt');
    let error = req.flash("error"); // whatever "error" the "isLoggedIn" middleware sent here, is stored in "error"
    res.render("index", { error, loggedin: false }); // send the error to "index.ejs"
});

router.get("/shop", isLoggedIn, async (req, res) => {

    let products = await productModel.find();
    res.render("shop", { products });
});

module.exports = router;