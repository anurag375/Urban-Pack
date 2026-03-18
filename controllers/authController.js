const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');
// const { get } = require('mongoose');

async function registerUser(req, res) {
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

                    res.cookie("token", token);
                    res.send("user registered successfully");
                }
            });
        });


    } catch(err) {
        res.send(err.message);
    }
}


module.exports.registerUser = registerUser;