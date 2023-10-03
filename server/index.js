const express = require("express");
const cors = require("cors");
let logger = require("morgan");
const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(logger("short"));

app.use(express.static("../client/build"));

app.use(express.json());

// Other server configuration and routes...
app.get("/api", (req, res) => {
    return res.send({msg: "done"}).status(200);
});

app.post("/submit", (req, res) => {
	console.log('submitted');
	console.log(req.body);
    return res.send({msg: "done"}).status(200);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
