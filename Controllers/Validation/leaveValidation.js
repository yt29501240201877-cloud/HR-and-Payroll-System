const joi = require("joi")

const leavetypeSchema = joi.object({
    TypeName: joi.string().required(),
    MaxDaysPerYear: joi.number().required()
})

const leaveSchema = joi.object({
    Amount: joi.string().required(),
    IsRecurring: joi.boolean().required(),
    Status: joi.string().required().valid("In Progress","Approved", "Rejected").default("In Progress"),
    Type: joi.string().required(),
    Employee: joi.string().required()
})

module.exports = {leavetypeSchema, leaveSchema}
