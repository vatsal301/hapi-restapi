const Joi = require("joi");

const createSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  username: Joi.string()
    .pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,}$/)
    .required(),
  number: Joi.string().min(10).max(10).required(),
  password: Joi.string().min(6).required(),
});

const numberSchema = Joi.object({
  phoneNumber: Joi.string()
    .pattern(/^\d{10}$/) // 10-digit number regex
    .required()
    .messages({
      "string.pattern.base": "Phone number must be a 10-digit number.",
    }),
});
module.exports = { createSchema, numberSchema };
