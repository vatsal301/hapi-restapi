const Joi = require("joi");
const mongoose = require("mongoose");

const validateMongoId = Joi.string().custom((value, helper) => {
  if (!mongoose.Types.ObjectId.isValid(value))
    return helper.message("Invalid User ObjectId");
});

const createSchema = Joi.object({
  title: Joi.string().min(5).max(30).required(),
  description: Joi.string(),
  completed: Joi.boolean().default(false),
//   user: validateMongoId.required(),
});

module.exports = { createSchema };
