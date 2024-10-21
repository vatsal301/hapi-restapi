const taskControllers = require("../controllers/task.controller");
const responseManager = require("../utility/responseManager");

const taskValidateSchema = require("../validations/task.validation");
const taskRoute = [
  {
    method: "POST",
    path: "/api/tasks",
    options: {
      validate: {
        payload: taskValidateSchema.createSchema,
        failAction: responseManager.failAction,
      },
    },
    handler: taskControllers.createTasksHandler,
  },
  {
    method: "GET",
    path: "/api/tasks",
    handler: taskControllers.getAllTasksHandler,
  },
  {
    method: "GET",
    path: "/api/tasks/{id}",
    options: {
      validate: {
        params: taskValidateSchema.objectId,
        failAction: responseManager.failAction,
      },
    },
    handler: taskControllers.getByIdTasksHandler,
  },
  {
    method: "PUT",
    path: "/api/tasks/{id}",
    options: {
      validate: {
        params: taskValidateSchema.objectId,
        payload: taskValidateSchema.updateSchema,
        failAction: responseManager.failAction,
      },
    },
    handler: taskControllers.updateTasksHandler,
  },
  {
    method: "DELETE",
    path: "/api/tasks/{id}",
    options: {
      validate: {
        params: taskValidateSchema.objectId,
        failAction: responseManager.failAction,
      },
    },
    handler: taskControllers.deleteTasksHandler,
  },
];
module.exports = taskRoute;
