const taskServices = require("../services/task.services");
const responseManager = require("../utility/responseManager");

const createTaskHandler = async (request, h) => {
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

module.exports = { createTaskHandler };
