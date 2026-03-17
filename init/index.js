const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
  console.log("connected to database");

  await Listing.deleteMany({});
  console.log("deleted");

  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "69b2f400f3b326aba3a2ba3e"
  }));

  await Listing.insertMany(initData.data);
  console.log("data was initialized");

  mongoose.connection.close();
}

main().catch(err => console.log(err));