const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router = express.Router();

router.get("/", (req, res) => {
    // res.render("index");
    // res.send('defaultttt');
    let error = req.flash("error"); // whatever "error" the "isLoggedIn" middleware sent here, is stored in "error"
    res.render("index", { error }); // send the error to "index.ejs"
});

router.get("/shop", isLoggedIn, (req, res) => {
    res.render("shop");
});

module.exports = router;