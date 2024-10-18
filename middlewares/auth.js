const jwt = require("jsonwebtoken");
const responseManager = require("../utility/responseManager");
const validateRequest = async (request, h) => {
  try {
    // const token = request.headers['authorization'];
    const token = request.headers["x-auth-token"]?.split(" ");
    console.log("token", token);
    const validationError = responseManager.validationError(
      h,
      "Invalid token payload!",
      {},
      401
    );
    if (!token) {
        console.log("not token ")
      return responseManager.validationError(
        h,
        "Invalid token payload!",
        {},
        401
      );
    }

    const decoded = jwt.verify(token[1], process.env.JWT_SECRET);
    const userData = await userServices.findUser(decoded._id);
    console.log("userData", userData);
    if (!userData) return validationError;
    request.userId = decoded;
    return h.continue;
  } catch (error) {
    message = `Server error occurred during 'validateRequest' deletion: ${error.message}`;
    return responseManager.error(
      h,
      message,
      { ...error, name: error.name },
      500
    );
  }
};

module.exports = { validateRequest };
