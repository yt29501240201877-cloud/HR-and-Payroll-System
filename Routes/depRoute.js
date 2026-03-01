const express = require("express")

const router = express.Router()

const { adddepartment, getdepartment, getdepartmentById, deleteDepartment, updateDepartment } = require('../Controllers/depController')


router.post("/", adddepartment)
router.get("/", getdepartment)
router.get("/:id", getdepartmentById)
router.delete("/:id", deleteDepartment)
router.put("/:id", updateDepartment)


module.exports = router;