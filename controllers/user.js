const userServices = require("../services/user.services");
const responseManager = require("../utility/responseManager");
const encryption = require("../utility/encryption");
const jwt = require("jsonwebtoken");

const registerHandler = async (request, h) => {
  // const { name, email, username, number, password } = request.payload;
  try {
    const userPayload = request.payload;
    userPayload.password = await encryption.encryptUtility(
      userPayload.password
    );
    let newUser = await userServices.create(userPayload);
    newUser = newUser.toObject();
    delete newUser.password;
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

    message = `Server error occurred during 'registerHandler' deletion: ${error.message}`;
    return responseManager.error(
      h,
      message,
      { ...error, name: error.name },
      500
    );
  }
};
const loginHandler = async (request, h) => {
  try {
    const { email, password } = request.payload;
    const userData = await userServices.findEmail(email);
    if (!userData)
      return responseManager.error(h, "Invalid Email or Password", {}, 401);
    const validatePassword = await encryption.validatePassword(
      password,
      userData.password
    );
    if (!validatePassword)
      return responseManager.error(h, "Invalid Email or Password", {}, 401);

    const token = jwt.sign({ _id: userData._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    delete userData.password;
    return responseManager.success(
      h,
      `${userData.name} you are login Successfully`,
      { token, userData },
      200
    );
  } catch (error) {
    message = `Server error occurred during 'loginHandler' deletion: ${error.message}`;
    return responseManager.error(
      h,
      message,
      { ...error, name: error.name },
      500
    );
  }
};

module.exports = { registerHandler, loginHandler };
