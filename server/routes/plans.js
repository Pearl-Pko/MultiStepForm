const express = require("express");
const router = express.Router();
const {connectToDb, getDb} = require("../connectToDb");

let db;
connectToDb(() => {
    db = getDb();
});

let i = 0;
router.get("/plans", (req, res) => {
    console.log("nothing");
    getAllDocuments("plans").then(result => res.status(200).send(result));
});

router.get("/addons", (req, res) => {
    console.log(i++);
    getAllDocuments("addons").then(result => res.status(200).send(result));
});

async function getAllDocuments(collectionName) {
    return db.collection(collectionName).find({}).toArray();
}

module.exports = router;
