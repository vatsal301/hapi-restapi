const Hapi = require("@hapi/hapi");
const logger = require("./logger");
const userRoutes = require("./routes/userRoute");
const taskRouts = require("./routes/taskRoute");
const JWT = require("@hapi/jwt");
const jwtStrategy = require("./utility/token");
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
  await server.register(JWT);
  const responseManager = require("./utility/responseManager");
  const userServices = require("./services/user.services");
  console.log("jwtStrategy", jwtStrategy);
  server.auth.strategy("jwt", "jwt", jwtStrategy);

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "hello";
    },
  });

  server.route(userRoutes);
  server.route(taskRouts);

  await server.start();
  logger.info(`Server is Started at ${server.info.uri}`);
};
init();

process.on("uncaughtException", (error) => {
  logger.error("uncaughtException:" + error);
  console.log("uncaughtException", error);
  process.exit(1);
});
