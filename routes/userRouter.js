const express = require('express');
const router = express.Router();
// const userModel = require('../models/user-model');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { generateToken } = require('../utils/generateToken');
// const { get } = require('mongoose');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');

router.get("/", (req, res) => {
    res.send("hey it's working USER!");
});

console.log(process.env.NODE_ENV, "from users");

// router.post("/register", require('../controllers/authController').registerUser);
router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);


module.exports = router;