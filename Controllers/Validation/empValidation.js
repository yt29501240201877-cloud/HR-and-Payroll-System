const joi = require("joi")

const empSchema = joi.object({
    FirstName: joi.string().required().lowercase().trim(),
    LastName: joi.string().required().trim(),
    Email: joi.string().email().required().lowercase(),
    Phone: joi.number().min(11),
    HireDate: joi.date().default(Date.now()),
    Jobtitle: joi.string().required(),
    BasicSalary: joi.number().min(0),
    Status: joi.string().valid("Active","Diactive").default("Active"),
    Departement: joi.string().required()
})

module.exports = {empSchema}