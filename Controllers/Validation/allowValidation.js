const joi = require("joi")

const allowSchema = joi.object({
    Name: joi.string().required(),
    Amount: joi.string().required(),
    IsRecurring: joi.boolean().required(),
    Employee: joi.string().required()
})

module.exports = {allowSchema}