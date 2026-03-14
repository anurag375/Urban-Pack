const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("hey it's working!");
});

console.log(process.env.NODE_ENV, "from users");

module.exports = router;