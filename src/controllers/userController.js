const jwt = require("jsonwebtoken");
const userSchema = require("../models/userModel");
const { secretKey } = require("../utils/constants");
const bcrypt = require("bcryptjs");
const { formatDuplicateError } = require("../utils/helpers");

const logInUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    let userResponse = await userSchema.findOne({ username });

    if (userResponse) {
      console.log(userResponse, "userResponse");

      const comparePassword = await bcrypt.compare(password, userResponse.password);
      if (comparePassword) {
        const { role = "", email = "" } = userResponse;
        jwt.sign(req.body, secretKey, { expiresIn: "1hr" }, (err, token) => {
          res.send({
            userName: username,
            role,
            email,
            authToken: token,
            userId: userResponse?._id,
          });
        });
      } else {
        return res.status(400).json({ message: "Invalid email or password" });
      }
    } else {
      res.status(400).json({
        errorMessage: "Invalid credentials",
      });
    }
  } catch (err) {
    res.send({
      errorMessage: err?.message,
    });
  }
};
const signUpUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword, "hashedPassword");

    const data = await userSchema.create({ ...req.body, password: hashedPassword });
    res.status(201).json({ message: "Sign Up Successfully" });
  } catch (error) {
    if (error.code === 11000) {
      res.status(200).json(formatDuplicateError(error));
    } else {
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  }
};

module.exports = { logInUser, signUpUser };

//  try {
//  } catch (err) {
//    res.send({
//      errorMessage: err?.message,
//    });
//  }
