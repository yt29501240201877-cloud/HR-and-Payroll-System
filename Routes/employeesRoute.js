const express = require("express")

const router = express.Router()

const authenticate = require("../Middleware/authenticate");
const authorize = require("../Middleware/authorize");

const { addemployee, getemployee, getemployeeById, deleteEmployee, updateEmployee, EmployeeStatus,
        searchEmployee} = require('../Controllers/employeesController')

router.post("/", authenticate, authorize("HR Manager"), addemployee)
router.get("/", authenticate, authorize("HR Manager"), getemployee)
router.get("/search", authenticate, authorize("HR Manager"), searchEmployee)
router.get("/:id", authenticate, authorize("HR Manager"), getemployeeById)
router.delete("/:id", authenticate, authorize("HR Manager"), deleteEmployee)
router.put("/:id", authenticate, authorize("HR Manager"), updateEmployee)
router.patch("/:id/status", authenticate, authorize("HR Manager"), EmployeeStatus)
 
module.exports = router;