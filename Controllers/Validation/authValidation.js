const joi = require("joi");


const userSchema = joi.object({
    Username: joi.string().min(4).max(20).required(),
    PasswordHash: joi.string().min(8).max(20).required(),
    Employee: joi.string().required(),
    Role: joi.string().valid("Admin","HR Manager","Accountant","Employee").required(),
});

const loginSchema = joi.object({
    Username: joi.string().min(4).max(20).required(),
    PasswordHash: joi.string().min(8).max(20).required(),
});

module.exports = {userSchema, loginSchema};