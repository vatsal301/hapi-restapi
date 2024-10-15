const userServices = require("../services/user.services");
const responseManager = require("../utility/responseManager");

const registerHandler = async (request, h) => {
  // const { name, email, username, number, password } = request.payload;
  try {
    const newUser = await userServices.create(request.payload);
    // if (!newUser) return responseManager.error(h, "User not Found", {}, 404);
    return responseManager.success(h, "User is Created", newUser, 201);
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

    message = "Server error occurred during task deletion";
    return responseManager.error(
      h,
      message,
      { ...error, name: error.name },
      500
    );
  }
};

module.exports = { registerHandler };
