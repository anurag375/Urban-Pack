const express = require('express');
const router = express.Router();    // creating a router object using .Router() method -> it will be used to define routes for the owner-related operations.
const ownerModel = require('../models/owner-model');

if(process.env.NODE_ENV === "development"){
    router.post('/create', async(req, res) => {
        // res.send("create route works");
        let owner = await ownerModel.find();    // better: .findOne()
        if(owner.length > 0){   // better: if(owner)
            return res
            .status(503)
            .send("CANNOT CREATE new owner. Owner already exists");
        }

        let { fullname, email, password } = req.body;

        // res.send("creating owner...");
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
            // products, picture, gstin
        });

        res.status(201).send(createdOwner);
    });
}

// temporary route..
// router.get("/owners", async (req, res) => {
//     let owners = await ownerModel.find();
//     res.send(owners);
// });

router.get("/", (req, res) => {
    res.send("hey it's working OWNER!");    // professionally, we don't use .send() method to send response, instead we use .render() method to render the view and send it as a response.
    // we create our "response handlers" (in services) in a separate file called ownerController.js and then we import those handlers here and use them in the routes. 
});

router.get("/admin", (req, res) => {
    res.render("create-products");
});


// console.log(process.env.NODE_ENV, "from owners");

module.exports = router;