const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require("./db/dbConnection.js");
const User = require("./models/user.js");
const cors = require("cors");

// middleware for parsing
app.use(express.json());
app.use(cors());

connectDB(); // connect to database

// register
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const newUser = new User({ username: username, password: password });
    await newUser.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
});

// login user
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username }); // finding the user
    if (!user) return res.status(404).json({ message: "User not found" }); // returning if user doesn't exist
    if (user.password === password)
      return res.status(200).json({
        message: "user successfully logged in",
      });
    // returning if user password is correct
    else return res.status(401).json({ message: "Invalid credentials" }); // returning if user password is incorrect
  } catch (error) {
    app.status(500).json({ message: "Something went wrong" });
    console.log(error); // error handling
  }
});

// listening server
app.listen(3000, () => {
  console.log(`\x1b[32m\nServer is running on port ${port}\x1b[0m`);
  console.log("\x1b[35mPress Ctrl + C to stop the server\x1b[0m");
  console.log("\x1b[36m%s\x1b[0m", `\t http://localhost:${port}`);
});
