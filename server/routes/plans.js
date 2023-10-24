const express = require("express");
const router = express.Router();
const {connectToDb, getDb} = require("../connectToDb");
const validator = require("validator");

let db;
connectToDb(() => {
    db = getDb();
});

let i = 0;
router.get("/plans", (req, res) => {
    console.log("nothing");
    getAllDocuments("plans").then((result) => res.status(200).send(result));
});

router.get("/addons", (req, res) => {
    console.log(i++);
    getAllDocuments("addons").then((result) => res.status(200).send(result));
});

router.post("/submit", (req, res) => {
    const {name, email, plan, addOns, duration} = req.body;
    const phoneNumber = req.body["phone number"];

    try {
        if (!name) 
            return res.status(400).json({message: "name field required"});

        if (!email) return res.status(400).json({message: "email field required"});

        if (!phoneNumber)
            return res.status(400).json({message: "phone number field required"});

        if (!duration) return res.status(400).json({message: "duration must be set"});

        if (!plan) return res.status(400).json({message: "plan field required"});

        if (!validator.isEmail(email))
            return res.status(400).json({message: "email is not valid"});

        if (!validator.isNumeric(phoneNumber))
            return res.status(400).json({message: "email is not valid"});

        db.collection("user-data").insertOne({
            name,
            email,
            "phone number": phoneNumber,
            duration,
            plan,
            addOns,
        });
        console.log("reached");
        res.status(200).json({message: "user data has been inserted"})
    } catch (error) {

        console.log("fail");
        res.status(400).json({error: error.message});
    }
});

async function getAllDocuments(collectionName) {
    return db.collection(collectionName).find({}).toArray();
}

module.exports = router;
