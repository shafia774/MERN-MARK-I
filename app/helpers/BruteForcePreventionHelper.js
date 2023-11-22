const ExpressBrute = require("express-brute");
const MongooseStore = require("express-brute-mongoose");
const BruteForceSchema = require("express-brute-mongoose/dist/schema");
const mongoose = require("mongoose");

// Define the Mongoose model
const BruteForce = mongoose.model("BruteForce", new mongoose.Schema(BruteForceSchema));

// Create an instance of the MongooseStore
const store = new MongooseStore(BruteForce);

// Create an instance of ExpressBrute using the MongooseStore
const bruteForcePrevention = new ExpressBrute(store);

// Export the bruteforce instance for use in other files
module.exports = bruteForcePrevention;