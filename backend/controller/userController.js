const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    // console.log("register", process.env.JWT_SECRET);
    jwt.sign(
      { newUser },
      process.env.JWT_SECRET,
      { expiresIn: "3h" },
      (err, token) => {
        if (err) {
          res.status(401).json({ message: "something went wrong", err });
        } else {
          res.status(201).json({ newUser, auth: token });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // console.log("login" ,process.env.JWT_SECRET);
    jwt.sign(
      { user },
      process.env.JWT_SECRET,
      { expiresIn: "2h" },
      (err, token) => {
        if (err) {
          res.status(401).json({ message: "something went wrong", err });
        } else {
          res.status(200).json({ user, auth: token });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};
