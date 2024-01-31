const mongoose = require("mongoose");

async function connectToMongo() {
  await mongoose.connect("mongodb://localhost:27017/SnapVault");
  console.log("Connected to mongo seccessfully");
}

module.exports = connectToMongo;
