const Hapi = require("@hapi/hapi");
const logger = require("./logger");
require("dotenv").config();
const init = async () => {
  await require("./config/database")();
  const server = Hapi.server({
    host: "localhost",
    port: 3000,
  });

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "hello";
    },
  });

  await server.start();
  logger.info(`Server is Started at ${server.info.uri}`);
};
init();

process.on("uncaughtException", (error) => {
  logger.error(error);
  process.exit(1);
});
