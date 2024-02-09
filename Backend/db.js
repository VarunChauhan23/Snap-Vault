const mongoose = require("mongoose");
require("dotenv").config({ path: './config.env' });
const url = process.env.mongo_uri;

async function connectToMongo() {
  await mongoose.connect(`${url}`);
  console.log("Connected to mongo seccessfully");
}

module.exports = connectToMongo;
