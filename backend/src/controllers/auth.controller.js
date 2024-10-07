import { User } from "../models/User";

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
