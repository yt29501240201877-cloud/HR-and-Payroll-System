const express = require("express")

const router = express.Router()

const authenticate = require("../Middleware/authenticate");
const authorize = require("../Middleware/authorize");

const {getempdeduc, applyfordeduc, updatededuc, deletededuc} = require("../Controllers/deductionController")

router.get("/employee/:id", authenticate,authorize("HR Manager"), getempdeduc)
router.post("/", authenticate,authorize("HR Manager"), applyfordeduc)
router.put("/:id", authenticate,authorize("HR Manager"), updatededuc)
router.delete("/:id", authenticate,authorize("HR Manager"), deletededuc)

module.exports = router 