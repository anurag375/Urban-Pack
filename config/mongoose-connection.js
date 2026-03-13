const mongoose = require('mongoose');

mongoose
.connect('mongodb://127.0.0.1:27017/Urban-Pack')    // written till developement phase  // professionally, we don't write the localhost URL in the code, instead we write it in the .env file and access it using process.env.DB_URL
// .connect(process.env.DB_URL)
.then(function(){
    console.log("connected");
})
.catch(function(err){
    console.log(err);
})

module.exports = mongoose.connection;