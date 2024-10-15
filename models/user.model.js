const mongoose = require("mongoose");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const usernameRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,}$/;
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [3, "Name must be at least 3 character long"],
    maxlength: [50, "Name must be less 50 character long"],
  },
  email: {
    type: email,
    required: [true, "Email is Required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [emailRegex, "Please Fill a valid email address"],
  },
  username: {
    type: String,
    required: [true, "Username is Required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [usernameRegex, "Username much be contain character and number"],
  },
  password: {
    type: "String",
    required: [true, "Password is Required"],
    minlength: [6, "Password must be least 6 characters long"],
    select: false,
  },
  createdAt: { type: Date, default: Date.now },
});

const Users = mongoose.model("Users", schema);

module.exports = Users;
