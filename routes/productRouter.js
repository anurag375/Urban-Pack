const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const productModel = require('../models/product-model');
const { createProduct } = require('../controllers/authController');

// router.get("/", (req, res) => {
//     res.send("hey it's working!");
// });

router.post("/create", upload.single("image"), async function (req, res) {
    // res.send(req.file);  // need the "buffer" only..

    try {
        let {
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor, } = req.body;    // don't take "image"

        let product = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor
        });

        // res.send(product);

        req.flash("success", "Product created successfully");
        res.redirect("../owner/admin");
    } catch(err) {
        res.send(err.message);  // for industry standards, make custom error handlers
    }
});

// router.post('/create', createProduct);

console.log(process.env.NODE_ENV, "from products");

module.exports = router;