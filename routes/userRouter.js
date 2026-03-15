const express = require('express');
const router = express.Router();
const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get("/", (req, res) => {
    res.send("hey it's working!");
});

console.log(process.env.NODE_ENV, "from users");

router.post("/register", (req, res) => {
    try{
        let { fullname, email, password } = req.body;

        bcrypt.genSalt(10, function(err, salt) {    // creating salt (random string)
            bcrypt.hash(password, salt, async function(err, hash) {
                if(err) return res.send(err.message);
                else {
                    res.send(hash);

                    // let user = await userModel.create({
                    //     fullname,
                    //     email,
                    //     password: hash
                    // });
                    // res.send(user);
                    
                    // let token = jwt.sign({email, id: user._id}, 'shhhhhhhhhh');
                    // res.send(token);
                    // res.cookie("token", token);
                    // res.send(token);
                }
            });
        });


    } catch(err) {
        res.send(err.message);
    }
});


module.exports = router;