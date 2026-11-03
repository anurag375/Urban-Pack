require("dotenv").config();  // can access the variables in .env file using process.env.VARIABLE_NAME
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");

const db = require("./config/mongoose-connection")
const ownerRuter = require("./routes/ownerRouter");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");

// const dotenv = 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(    // middleware for sessions => as "flash" messages needs sessions
    expressSession({
        resave: false,  // don't create sessions for unchanged data
        saveUninitialized: false,   // don't create sessions for uninitialized/unloggedin users
        secret: process.env.Express_SESSION_SECRET
    })
);
app.use(flash());   // setup "flash" messages

app.set("view engine", "ejs");

app.use("/owner", ownerRuter);
app.use("/users", userRouter);
app.use("/products", productRouter);

// app.get("/", (req, res) => {
//     res.send("default route working in APP.js");
// })

// app.listen(3000);

// 3. Mount the index router on the root path
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// 4. Start the server on port 3000
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});