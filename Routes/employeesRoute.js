const express = require("express")

const router = express.Router()

const { addemployee, getemployee, getemployeeById, deleteEmployee, updateEmployee } = require('../Controllers/employeesController')

router.post("/", addemployee)
router.get("/", getemployee)
router.get("/:id", getemployeeById)
router.delete("/:id", deleteEmployee)
router.put("/:id", updateEmployee)


// /:id/status

module.exports = router;