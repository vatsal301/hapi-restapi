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

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = { createSchema, loginSchema };
