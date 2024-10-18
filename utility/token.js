const userServices = require("../services/user.services");
const responseManager = require("./responseManager");
// Authorization: Bearer <your-token>
module.exports = {
  keys:
    process.env.JWT_SECRET ||
    `!@$%^&*THIS-__-IS@__@MY&__&SECRET$__$KEYY!@$%^&*`,
  verify: {
    aud: false, // Optional audience verification
    iss: false, // Optional issuer verification
    sub: false, // Optional subject verification
    nbf: true, // Enable 'not before' claim verification
    exp: true, // Enable expiration claim verification
  },
  validate: async (artifacts, request, h) => {
    console.log("artifacts.decoded.payload", artifacts.decoded.payload._id);
    const userId = artifacts.decoded.payload._id;
    const validationError = responseManager.validationError(
      h,
      "Invalid token payload!",
      {},
      401
    );
    if (!userId)
      return responseManager.validationError(
        h,
        "Invalid token payload!",
        {},
        401
      );
    const userData = await userServices.findUser(userId);
    console.log("userData", userData);
    if (!userData)
      return responseManager.validationError(
        h,
        "Invalid token payload in user!",
        {},
        401
      );
    return { isValid: true, credential: { userId: userId } };
  },
};
