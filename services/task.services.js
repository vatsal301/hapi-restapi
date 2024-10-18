const taskModel = require("../models/task.model");

const create = async (task) => {
  const newTask = new taskModel(task);
  return await newTask.save();
};

// const findEmail = async (email) => {
//   return await taskModel
//     .findOne({ email }, { _id: 1, password: 1, email: 1, name: 1 })
//     .select("+password")
//     .lean();
// };

// const deleteById = async (userId) => {
//   return await taskModel.findByIdAndDelete(userId).exec();
// };

module.exports = { create };
