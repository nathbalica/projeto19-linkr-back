import Joi from 'joi';

export const signupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    'any.required': 'Username is required',
    'string.empty': 'Username cannot be empty',
    'string.min': 'Username must be at least {#limit} characters long',
    'string.max': 'Username cannot be longer than {#limit} characters',
    'string.alphanum': 'Username must only contain alphanumeric characters',
  }),
  name: Joi.string().required().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name cannot be empty',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.empty': 'Email cannot be empty',
    'string.email': 'Invalid email format',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'Password is required',
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password must be at least {#limit} characters long',
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.required': 'Confirm password is required',
    'any.only': 'Passwords do not match',
  }),
  profile_image: Joi.string().uri().allow(null).optional().messages({
    'string.uri': 'Invalid URL format',
  }),
});

export const signinSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.empty': 'Email cannot be empty',
    'string.email': 'Invalid email format',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'Password is required',
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password must be at least {#limit} characters long',
  }),
});

export const updateCustomerSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().messages({
      'any.required': 'Username is required',
      'string.empty': 'Username cannot be empty',
      'string.min': 'Username must be at least {#limit} characters long',
      'string.max': 'Username cannot be longer than {#limit} characters',
      'string.alphanum': 'Username must only contain alphanumeric characters',
    }),
    profile_image: Joi.string().uri().allow(null).optional().messages({
      'string.uri': 'Invalid URL format',
    }),
  });
  
  export const publishPostSchema = Joi.object({
    content: Joi.string().required().messages({
      'any.required': 'Content is required',
      'string.empty': 'Content cannot be empty',
    }),
    link: Joi.string().uri().allow(null).optional().messages({
      'string.uri': 'Invalid URL format',
    }),
  });