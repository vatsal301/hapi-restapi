const userControllers = require("../controllers/user");
// const { validate } = require("../models/user.model");
const responseManager = require("../utility/responseManager");
const Joi = require("joi");

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
      handler: userControllers.registerHandler,
    },
  },
  {
    method: "POST",
    path: "/validate-phone",
    options: {
      validate: {
        payload: userValidateSchema.numberSchema,
        failAction: (request, h, err) => {
          // Log the error
          console.error("Validation Error:", err.details);

          // Return a structured error response
          const response = {
            status: "fail",
            message: "Invalid input",
            validation: {
              code: 400,
              details: err.details,
            },
          };

          // Return the response with a 400 status code
          return responseManager
            .validationError(h, "message", err.details, 400)
            .takeover();
          // return h.response(response).code(400).takeover(); // `takeover()` prevents Hapi from continuing with the request lifecycle
        },
        // Handle validation errors using a custom method
        options: {
          abortEarly: false, // return all errors
        },
      },
    },
    handler: (request, h) => {
      const { phoneNumber } = request.payload;
      return h
        .response({ message: `Phone number "${phoneNumber}" is valid.` })
        .code(200);
    },
  },
  // {
  //   method: "POST",
  //   path: "/user/login",
  //   handler: (request, h) => {},
  // },
];
module.exports = usersRoute;
