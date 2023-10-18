const express = require("express");
const cors = require("cors");
let logger = require("morgan");
const app = express();
const dotenv = require('dotenv').config();
const {connectToDb, getDb} = require('./connectToDb');
const plans = require('./routes/plans')
// Enable CORS for all routes

let db;
connectToDb((err) => {
    if (!err) {
        app.listen(process.env.PORT, () => {
            console.log(`Server listening on port ${process.env.PORT}`);
        });
        db = getDb();
    }
    else {
        console.log("error connecting to db");
    }
});

app.use(cors());

app.use(logger("short"));

app.use(express.static("../client/build"));

app.use(express.json());

app.use('/api', plans);

// Other server configuration and routes...
// app.get("/api", (req, res) => {
//     return res.send({msg: "done"}).status(200);
// });

// app.post("/submit", (req, res) => {
// 	console.log('submitted');
// 	console.log(req.body);
//     return res.send({msg: "done"}).status(200);
// });

// const PORT = 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
