const express = require("express")

const router = express.Router()

const { addemployee, getemployee, getemployeeById, deleteEmployee, updateEmployee, EmployeeStatus,
        searchEmployee} = require('../Controllers/employeesController')

router.post("/", addemployee)
router.get("/", getemployee)
router.get("/search", searchEmployee)
router.get("/:id", getemployeeById)
router.delete("/:id", deleteEmployee)
router.put("/:id", updateEmployee)
router.patch("/:id/status", EmployeeStatus)
 
module.exports = router;