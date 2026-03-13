const express = require('express');
const router = express.Router();    // creating a router object using .Router() method -> it will be used to define routes for the owner-related operations.

router.get("/", (req, res) => {
    res.send("hey it's working!");    // professionally, we don't use .send() method to send response, instead we use .render() method to render the view and send it as a response.
    // we create our "response handlers" (in services) in a separate file called ownerController.js and then we import those handlers here and use them in the routes. 
});

module.exports = router;