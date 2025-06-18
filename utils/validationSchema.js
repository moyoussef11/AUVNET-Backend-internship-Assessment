const joi = require("joi");

function validateUserRegistration(dataObi) {
  const schema = joi.object({
    username: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(5).max(50).required(),
    role: joi.string().valid("user", "admin").default("user"),
  });
  return schema.validate(dataObi);
}

function validateUserLogin(dataObi) {
  const schema = joi.object({
    username: joi.string().min(3).max(30).required(),
    password: joi.string().min(5).max(50).required(),
  });
  return schema.validate(dataObi);
}

function validateCreateCategory(dataObi) {
  const schema = joi.object({
    name: joi.string().min(2).max(50).required().trim(),
    parent: joi.string().default(null).allow(null),
  });
  return schema.validate(dataObi);
}

function validateCreateProduct(dataObi) {
  const schema = joi.object({
    title: joi.string().min(2).max(50).required().trim(),
    details: joi.string().min(10).required(),
    price: joi.number().required(),
    category: joi.string().required(),
  });
  return schema.validate(dataObi);
}

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateCreateCategory,
  validateCreateProduct,
};
