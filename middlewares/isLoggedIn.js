const jwt =  require('jsonwebto');
const userModel = require('../models/user-model');

module.exports = async function (req, res, next) {
    if(!req.cookies.token) {
        req.flash("error", "You need to be logged in to access this page");
        return res.redirect("/");
    }

    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel
        .findOne({ email: decoded.email })
        .select("-password");  // excluding password field from the result
        req.user = user;    // attaching user to the request object
        next();
    } catch (error) {
        req.flash("error", "Invalid token");
        return res.redirect("/");
    }

};