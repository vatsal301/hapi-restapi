const taskModel = require("../models/task.model");

const create = async (task) => {
  const newTask = new taskModel(task);
  return await newTask.save();
};
const getAll = async (userId) => {
  return await taskModel.find({ user: userId }, { user: 0 }).lean();
};
const getById = async (userId, taskId) => {
  return await taskModel
    .findOne({ user: userId, _id: taskId }, { user: 0 })
    .lean();
};
const update = async (userId, taskId, updatedTask) => {
  return await taskModel
    .findByIdAndUpdate({ user: userId, _id: taskId }, updatedTask, {
      new: true,
      runValidators: true,
    })
    .lean();
};
const deleteById = async (userId, taskId) => {
  console.log("delete call");
  return await taskModel.findOneAndDelete({ _id: taskId, user: userId }).lean();
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

module.exports = { create, getAll, getById, update, deleteById };
