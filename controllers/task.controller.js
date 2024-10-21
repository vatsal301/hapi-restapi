const taskServices = require("../services/task.services");
const responseManager = require("../utility/responseManager");

const createTasksHandler = async (request, h) => {
  try {
    const taskPayload = request.payload;
    taskPayload.user = request.userId;
    let newTask = await taskServices.create(taskPayload);
    return responseManager.success(h, "Task is Created", newTask, 201);
  } catch (error) {
    let message = "";
    if (error.name === "ValidationError") {
      message = "Validation failed";
      const validationErrors = Object.values(error.errors).map((err) => ({
        field: err.path,
        message: err.message,
      }));
      return responseManager.validationError(h, message, validationErrors, 400);
    }

    if (error.code === 11000) {
      let duplicateField = Object.keys(error.keyValue)[0];
      message = `${duplicateField} is already exists`;
      return responseManager.error(h, message, {}, 409);
    }

    message = `Server error occurred during 'registerHandler' deletion: ${error.message}`;
    return responseManager.error(
      h,
      message,
      { ...error, name: error.name },
      500
    );
  }
};

const getAllTasksHandler = async (request, h) => {
  try {
    let tasks = await taskServices.getAll(request.userId);
    return responseManager.success(h, "Fetch all Task", tasks, 200);
  } catch (error) {
    let message = `Server error occurred during 'getAllTasksHandler' deletion: ${error.message}`;
    return responseManager.error(
      h,
      message,
      { ...error, name: error.name },
      500
    );
  }
};
const getByIdTasksHandler = async (request, h) => {
  try {
    let task = await taskServices.getById(request.userId, request.params.id);
    if (!task) return responseManager.error(h, "Invalid Id");
    return responseManager.success(h, "Fetch Task", task, 200);
  } catch (error) {
    let message = `Server error occurred during 'getByIdTasksHandler' deletion: ${error.message}`;
    return responseManager.error(
      h,
      message,
      { ...error, name: error.name },
      500
    );
  }
};
const updateTasksHandler = async (request, h) => {
  try {
    let isUser = await taskServices.getById(request.userId, request.params.id);
    if (!isUser) return responseManager.validationError(h, "Invalid Task ID");
    let task = await taskServices.update(
      request.userId,
      request.params.id,
      request.payload
    );
    return responseManager.success(h, "Update Task", task, 200);
  } catch (error) {
    if (error.name === "ValidationError") {
      let message;
      message = "Validation failed";
      const validationErrors = Object.values(error.errors).map((err) => ({
        field: err.path,
        message: err.message,
      }));
      return responseManager.validationError(h, message, validationErrors, 400);
    }
    message = `Server error occurred during 'updateTasksHandler' deletion: ${error.message}`;
    return responseManager.error(
      h,
      message,
      { ...error, name: error.name },
      500
    );
  }
};
const deleteTasksHandler = async (request, h) => {
  try {
    let isUser = await taskServices.getById(request.userId, request.params.id);
    if (!isUser) return responseManager.validationError(h, "Invalid Task ID");
    let task = await taskServices.deleteById(request.userId, request.params.id);
    return responseManager.success(h, "Delete Task", task, 200);
  } catch (error) {
    if (error.name === "ValidationError") {
      let message;
      message = "Validation failed";
      const validationErrors = Object.values(error.errors).map((err) => ({
        field: err.path,
        message: err.message,
      }));
      return responseManager.validationError(h, message, validationErrors, 400);
    }
    message = `Server error occurred during 'deleteTasksHandler' deletion: ${error.message}`;
    return responseManager.error(
      h,
      message,
      { ...error, name: error.name },
      500
    );
  }
};

module.exports = {
  createTasksHandler,
  getAllTasksHandler,
  getByIdTasksHandler,
  updateTasksHandler,
  deleteTasksHandler,
};
