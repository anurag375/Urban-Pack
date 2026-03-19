const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');
// const { get } = require('mongoose');

module.exports.registerUser = async function (req, res) {
    try{
        let { fullname, email, password } = req.body;

        // 1. Check if email already exists:
        let existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User with this email already exists");
        }

        // 2. Hash password:
        bcrypt.genSalt(10, function(err, salt) {    // creating salt (random string)
            bcrypt.hash(password, salt, async function(err, hash) {
                if(err) return res.send(err.message);
                else {
                    // res.send(hash);
                    // demo: $2b$10$XU8UTh2qc5kLnjW6tzuUU.sKgfKVcqAp0NJJ25tgPI5vTIgqfh3Cq

                    // 3️. Create user:
                    let user = await userModel.create({
                        fullname,
                        email,
                        password: hash
                    });
                    // res.send(user);
                    
                    // 4. Generate token:
                    // let token = jwt.sign({email, id: user._id}, 'shhhhhhhhhh');
                    let token = generateToken(user);
                    // res.send(token);
                    // demo: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjFAZWcuY29tIiwiaWF0IjoxNzczNjgxNjM5fQ.hESo-BzU3h4HJlQO5j649hrZyKyo26l_rIu7m-2Hsi4

                    res.cookie("token", token,{
                        httpOnly: true,                      // cannot be accessed by client JS
                        secure: process.env.NODE_ENV === "production"
                    });
                    res.send("user registered successfully");
                }
            });
        });


    } catch(err) {
        res.send(err.message);
    }
}

module.exports.loginUser = async function (req, res) {
    // console.log("login route hit");

    let {email, password} = req.body;

    let user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).send("Incorrect email or password");
    }

    bcrypt.compare(password, user.password, function(err, result) {
        if (err) return res.send(err.message);
        if (result) {
            let token = generateToken(user);
            res.cookie("token", token);
            res.send("user logged in successfully");
            // res.redirect("/shop");
        } else {
            // res.status(400).send("Incorrect email or password");
            req.flash("error", "Incorrect email or password");
            return res.redirect("/");
        }
    });
}

module.exports.logoutUser = function (req, res) {
    // res.clearCookie("token");    // it doesn't work in some cases (like when secure flag is true) so we are setting token cookie to empty string
    res.cookie("token", "");
    res.redirect("/");
}


// module.exports.registerUser = registerUser;