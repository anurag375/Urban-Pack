const mongoose = require('mongoose');
const config = require("config");

const dbgr = require("debug")("development:mongoose");

mongoose
// mongodb://127.0.0.1:27017
// .connect('/Urban-Pack')    // --> written till developement phase  // professionally, we don't write the localhost URL in the code, instead we write it in the .env file and access it using process.env.DB_URL
// --> .connect(process.env.DB_URL)
.connect(config.get("MONGODB_URI") + "/Urban-Pack")    // using config module to access the MongoDB URI from the development.json file.  // we can also use dotenv module to access the environment variables from the .env file.
// --> or .connect(`${config.get("MONGODB_URI")}/Urban-Pack`)    

.then(function(){
    // console.log("connected");
    dbgr("connected to MongoDB successfully!");    // using debug module to log the message instead of console.log() method.  // we can also use chalk module to color the log messages.
})
.catch(function(err){
    // console.log(err);
    dbgr(err);
})

module.exports = mongoose.connection;