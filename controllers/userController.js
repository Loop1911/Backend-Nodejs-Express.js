const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");

//@desc Register a new user
//@route POST /api/user/register
//@access Public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please provide a name, email and password!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already exists!");
  }

  //Hash password

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashed password", hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`user created ${user}`);
  if (user) {
    res.status(201).json({ _id: user._id, email: user.email });

    res.json({ message: "Register the User" });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc Login user
//@route POST /api/user/login
//@access Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide a email and password!");
  }

  const user = await User.findOne({ email });
  //compare password with hash password

  if (user && bcrypt.compare("abc", password)) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },

      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc Current user
//@route POST /api/user/current
//@access Private

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
