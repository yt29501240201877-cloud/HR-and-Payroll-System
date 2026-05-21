const joi = require("joi")

const checkinSchema = joi.object({
    Status: joi.string().valid("Attend", "Absent", "Execu").required(),
    Employee: joi.string().required()
})

const checkoutSchema = joi.object({
    Employee: joi.string().required()
})

module.exports = {checkinSchema, checkoutSchema}