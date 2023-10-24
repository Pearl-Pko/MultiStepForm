const {MongoClient} = require("mongodb");
const dotenv = require("dotenv").config();

let dbConnection;

async function connectToDb(callback) {
    if (dbConnection) return callback();

    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        dbConnection = client.db();
        console.log("connected");
        return callback();
    } catch (e) {
        console.error(e);
        return callback(e);
    }
}

const getDb = () => dbConnection;

module.exports = {connectToDb, getDb};
