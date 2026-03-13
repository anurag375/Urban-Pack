const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");

const db = require("./config/mongoose-connection")
const ownerRuter = require("./routes/ownerRouter");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/owner", ownerRuter);
app.use("/user", userRouter);
app.use("/product", productRouter);

// app.get("/", (req, res) => {
//     res.send("default route working");
// })

app.listen(3000);