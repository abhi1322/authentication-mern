const mongoose = require("mongoose");

// establish connection
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/myFirstApp");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
