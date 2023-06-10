const Joi = require("joi");

exports.register = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
});

exports.createUser = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
    isAdmin: Joi.boolean().required(),
});

exports.updateUser = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    isAdmin: Joi.boolean().required(),
});

exports.login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
});

exports.createProduct = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(3).max(1000).required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    category: Joi.string().required(),
});

exports.updateProduct = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(3).max(1000).required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    category: Joi.string().required(),
    image: Joi.string().required(),
});
