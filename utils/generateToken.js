const jwt = require('jsonwebtoken');

function generateToken(user) {  // or we can give payload (payload is the data that we want to store in the token) 
    return jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY);  // , { expiresIn: '1h' }
}

module.exports.generateToken = generateToken;