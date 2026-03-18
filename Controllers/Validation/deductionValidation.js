const joi = require("joi")

const deducSchema = joi.object({
    Name: joi.string().required(),
    Amount: joi.string().required(),
    IsRecurring: joi.boolean().required(),
    Employee: joi.string().required()
})

module.exports = {deducSchema}