const joi = require("joi")

const depSchema = joi.object({
    DepartmentName: joi.string().required().trim(),
    Description: joi.string().max(250)
})

module.exports = {depSchema}