const { User } = require("../models/User");

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