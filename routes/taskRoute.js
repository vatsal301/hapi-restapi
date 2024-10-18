const taskControllers = require("../controllers/task.controller");
const responseManager = require("../utility/responseManager");
const auth = require("../middlewares/auth");
const taskValidateSchema = require("../validations/task.validation");
const taskRoute = [
  {
    method: "POST",
    path: "/api/task/create",
    options: {
      pre: [{ method: auth.validateRequest, assign: "auth" }],
      validate: {
        payload: taskValidateSchema.createSchema,
        failAction: responseManager.failAction,
      },
    },
    handler: taskControllers.createTaskHandler,
  },
];
module.exports = taskRoute;
