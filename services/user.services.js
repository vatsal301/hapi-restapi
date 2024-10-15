const userModel = require("../models/user.model");

const create = async (user) => {
  const newUser = new userModel(user);
  return await newUser.save();
};

const deleteById = async (userId) => {
  return await userModel.findByIdAndDelete(userId).exec();
};

module.exports = { create, deleteById };
