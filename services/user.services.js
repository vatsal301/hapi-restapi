const userModel = require("../models/user.model");

const create = async (user) => {
  const newUser = new userModel(user);
  return await newUser.save();
};
const findEmail = async (email) => {
  return await userModel
    .findOne({ email }, { _id: 1, password: 1, email: 1, name: 1 })
    .select("+password")
    .lean();
};
const findUser = async (id) => {
  return await userModel.findById(id, { _id: 1 }).lean();
};

const deleteById = async (userId) => {
  return await userModel.findByIdAndDelete(userId).exec();
};

module.exports = { create, deleteById, findEmail, findUser };
