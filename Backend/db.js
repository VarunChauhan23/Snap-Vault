const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const uri = `${process.env.mongo_atlas_uri}`;
console.log(uri);
console.log(typeof uri);

async function connectToMongo() {
  await mongoose.connect(uri);
  console.log("Connected to mongo seccessfully");
}

module.exports = connectToMongo;
