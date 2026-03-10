const express = require("express")

const router = express.Router()

const authenticate = require("../Middleware/authenticate");
const authorize = require("../Middleware/authorize");

const { adddepartment, getdepartment, getdepartmentById, deleteDepartment, updateDepartment, getdep_empById } = require('../Controllers/depController')


router.post("/", authenticate, authorize("HR Manager"), adddepartment)
router.get("/", authenticate, authorize("HR Manager"), getdepartment)
router.get("/:id/employees", authenticate, authorize("HR Manager"), getdep_empById)
router.get("/:id", authenticate, authorize("HR Manager"), getdepartmentById)
router.delete("/:id", authenticate, authorize("HR Manager"), deleteDepartment)
router.put("/:id", authenticate, authorize("HR Manager"), updateDepartment)


module.exports = router;