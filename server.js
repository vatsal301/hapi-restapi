const Hapi = require("@hapi/hapi");
const logger = require("./logger");
const userRoutes = require("./routes/userRoute");
require("dotenv").config();
const Joi = require("joi");
const init = async () => {
  await require("./config/database")();
  const server = Hapi.server({
    host: "localhost",
    port: 3000,
  });

  server.ext("onRequest", (request, h) => {
    logger.info(`${request.method.toUpperCase()} ${request.path}`);
    return h.continue;
  });
  server.ext("onPreResponse", (request, h) => {
    const { response } = request;
    if (response.isBoom) {
      logger.error(
        `${request.method.toUpperCase()} ${request.path} Error is: ${
          response.output.statusCode
        } - ${response.message}`
      );
    }
    return h.continue;
  });

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "hello";
    },
  });
  // server.route({
  //   method: "POST",
  //   path: "/validate-phone",
  //   options: {
  //     validate: {
  //       payload: numberSchema,
  //       // Handle validation errors using a custom method
  //       options: {
  //         abortEarly: false, // return all errors
  //       },
  //     },
  //   },
  //   handler: (request, h) => {
  //     const { phoneNumber } = request.payload;
  //     return h
  //       .response({ message: `Phone number "${phoneNumber}" is valid.` })
  //       .code(200);
  //   },
  // });

  server.route(userRoutes);

  await server.start();
  logger.info(`Server is Started at ${server.info.uri}`);
};
init();

process.on("uncaughtException", (error) => {
  logger.error("uncaughtException:" + error);
  process.exit(1);
});
