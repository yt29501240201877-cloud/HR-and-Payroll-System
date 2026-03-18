const express = require("express")

const router = express.Router()

const authenticate = require("../Middleware/authenticate");
const authorize = require("../Middleware/authorize");

const {addleave, getleave, updateleave, deleteleave, applyforleave, getallEmpleave,
       getempleaves, approveleave, rejectleave} = require("../Controllers/leavestypeController")

router.post("/", authenticate, authorize("HR Manager"), addleave)
router.get("/", authenticate,authorize("HR Manager"), getleave)
router.put("/:id", authenticate,authorize("HR Manager"), updateleave)
router.delete("/:id", authenticate,authorize("HR Manager"), deleteleave)

router.post("/leaverequest", authenticate, authorize("HR Manager"), applyforleave)
router.get("/allleaves", authenticate,authorize("HR Manager"), getallEmpleave)
router.get("/employee/:id", authenticate,authorize("HR Manager"), getempleaves)
router.patch("/:id/approve", authenticate,authorize("HR Manager"), approveleave)
router.patch("/:id/reject", authenticate,authorize("HR Manager"), rejectleave)

module.exports = router 