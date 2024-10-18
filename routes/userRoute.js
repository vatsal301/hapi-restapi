const userControllers = require("../controllers/user");
// const { validate } = require("../models/user.model");
const responseManager = require("../utility/responseManager");

const userValidateSchema = require("../validations/user.validation");
const usersRoute = [
  {
    method: "POST",
    path: "/api/user/register",
    options: {
      validate: {
        payload: userValidateSchema.createSchema,
        failAction: responseManager.failAction,
      },
    },
    handler: userControllers.registerHandler,
  },
  {
    method: "POST",
    path: "/api/user/login",
    options: {
      validate: {
        payload: userValidateSchema.loginSchema,
        failAction: responseManager.failAction,
      },
    },
    handler: userControllers.loginHandler,
  },
];
module.exports = usersRoute;
