const express = require("express")

const router = express.Router()

const { adddepartment, getdepartment, getdepartmentById, deleteDepartment, updateDepartment, getdep_empById } = require('../Controllers/depController')


router.post("/", adddepartment)
router.get("/", getdepartment)
router.get("/:id", getdepartmentById)
router.get("/:id/employees", getdep_empById)
router.delete("/:id", deleteDepartment)
router.put("/:id", updateDepartment)


module.exports = router;