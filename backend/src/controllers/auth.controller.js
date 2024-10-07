const { User } = require("../models/User");

export const test = async (req, res) => {};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.send("Login successful!");
    } else {
      res.status(401).send("Invalid username or password");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({
                message: 'this user already registered'
            })
        }

        // Create a new user instance
        const newUser = new User({ username, password, email });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

module.exports = {
    registerUser
};

