const mongoose = require("mongoose");

const schema = mongoose.Schema;
const logIn = new schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true },
    role: { type: String },
    password: { type: String, required: true },
  },
  { timeStamps: true }
);

const userSchema = mongoose.model("usersData", logIn);

module.exports = userSchema;
