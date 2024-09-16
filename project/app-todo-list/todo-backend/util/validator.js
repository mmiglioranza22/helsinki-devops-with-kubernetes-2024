const Joi = require("joi");

const todoSchema = Joi.string().min(5).max(140).required();

module.exports = todoSchema;
