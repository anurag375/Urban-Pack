const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router = express.Router();

router.get("/", (req, res) => {
    // res.render("index");
    res.send('defaultttt');
});

router.get("/shop", isLoggedIn, (req, res) => {
    res.render("shop");
});

module.exports = router;