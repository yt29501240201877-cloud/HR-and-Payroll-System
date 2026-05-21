const joi = require("joi");


const userSchema = joi.object({
<<<<<<< HEAD
    Username: joi.string().min(4).max(20).required().trim(),
    PasswordHash: joi.string().min(8).max(20).required().trim(),
=======
    Username: joi.string().min(4).max(20).required(),
    PasswordHash: joi.string().min(8).max(20).required(),
>>>>>>> e1feb8a550e99c562ec7cacb8457a28f79216e7a
    Employee: joi.string().required(),
    Role: joi.string().valid("Admin","HR Manager","Accountant","Employee").required(),
});

const loginSchema = joi.object({
<<<<<<< HEAD
    Username: joi.string().min(4).max(20).required().trim(),
    PasswordHash: joi.string().min(8).max(20).required().trim(),
=======
    Username: joi.string().min(4).max(20).required(),
    PasswordHash: joi.string().min(8).max(20).required(),
>>>>>>> e1feb8a550e99c562ec7cacb8457a28f79216e7a
});

module.exports = {userSchema, loginSchema};