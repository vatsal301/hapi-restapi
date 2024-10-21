const taskControllers = require("../controllers/task.controller");
const responseManager = require("../utility/responseManager");

const taskValidateSchema = require("../validations/task.validation");
const taskRoute = [
  {
    method: "POST",
    path: "/api/task/create",
    options: {
      validate: {
        payload: taskValidateSchema.createSchema,
        failAction: responseManager.failAction,
      },
    },
    handler: taskControllers.createTaskHandler,
  },
];
module.exports = taskRoute;
