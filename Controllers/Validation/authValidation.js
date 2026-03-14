const joi = require("joi");


const userSchema = joi.object({
    Username: joi.string().min(8).max(20).required(),
    PasswordHash: joi.string().min(8).max(20).required(),
    Employee: joi.string().required(),
    Role: joi.string().validate("Admin","HR Manager","Accountant","Employee"),
});

module.exports = {userSchema};