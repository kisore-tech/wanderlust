const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
  console.log("connected to database");

  await Listing.deleteMany({});
  console.log("deleted");

  await Listing.insertMany(initData);
  console.log("data was initialized");

  mongoose.connection.close();
}

main().catch(err => console.log(err));
