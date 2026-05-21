const express = require("express")

const router = express.Router()

const authenticate = require("../Middleware/authenticate");
const authorize = require("../Middleware/authorize");

const {getempallow, applyforallow, updateallow, deletededuc} = require("../Controllers/allowController")

router.get("/employee/:id", authenticate,authorize("HR Manager"), getempallow)
router.post("/", authenticate,authorize("HR Manager"), applyforallow)
router.put("/:id", authenticate,authorize("HR Manager"), updateallow)
router.delete("/:id", authenticate,authorize("HR Manager"), deletededuc)

module.exports = router 