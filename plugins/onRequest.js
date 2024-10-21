"use strict";
const responseManager = require("../utility/responseManager");
const logger = require("../logger");
const userServices = require("../services/user.services");
const jwt = require("jsonwebtoken");
module.exports = {
  name: "onRequest",
  version: "1.0.0",
  register: async (server, options) => {
    server.ext("onRequest", async (request, h) => {
      try {
        logger.info(`${request.method.toUpperCase()} ${request.path}`);

        if (request.path === "/api/user/login") {
          return h.continue;
        }
        const token = request.headers["x-auth-token"]?.split(" ");
        if (!token) {
          throw new Error("Token is missing or improperly formatted!");
        }
        let decoded;
        try {
          decoded = jwt.verify(token[1], process.env.JWT_SECRET);
        } catch (error) {
          if (error.name === "TokenExpiredError") {
            throw new Error("Token has expired. Please login again.");
          } else if ("JsonWebTokenError") {
            throw new Error("Invalid token. Please provide a valid token.");
          } else {
            throw new Error("Failed to authenticate token.");
          }
        }
        const userData = await userServices.findUser(decoded._id);
        if (!userData) {
          throw new Error("User not found. Invalid token.");
        }
        request.userId = decoded._id;
        return h.continue;
      } catch (error) {
        // logger.error("JWT Error: ", error);
        if (
          error.message.toLowerCase().includes("token") ||
          error.message.includes("User")
        ) {
          return responseManager.error(h, error.message, {}, 401).takeover();
        }
        return responseManager.error(
          h,
          "An unexpected error occurred. Please try again later.",
          {},
          500
        );
      }
    });
  },
};
