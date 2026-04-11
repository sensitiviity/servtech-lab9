const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required().messages({
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name must not exceed 50 characters',
    'any.required': 'Name is required',
    'string.empty': 'Name cannot be empty',
  }),

  email: Joi.string().email().lowercase().trim().required().messages({
    'string.email': 'Enter a valid email address',
    'any.required': 'Email is required',
    'string.empty': 'Email cannot be empty',
  }),

  password: Joi.string().min(8).max(64).required().messages({
    'string.min': 'Password must be at least 8 characters',
    'any.required': 'Password is required',
    'string.empty': 'Password cannot be empty',
  }),

  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
    'any.required': 'Confirm password is required',
  }),
});

module.exports = { registerSchema };