const mongoose = require("mongoose");
require('dotenv').config()

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to MongoDB");
    return result;
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err.message);
  });

module.exports = mongoose;
