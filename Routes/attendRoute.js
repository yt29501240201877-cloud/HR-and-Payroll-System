const express = require("express")

const router = express.Router()

const authenticate = require("../Middleware/authenticate");
const authorize = require("../Middleware/authorize");

const {checkin, checkout, getallrecords, getemprecords, updateattend, attendreport} = require("../Controllers/attendController")

router.post("/check-in", checkin)
router.post("/check-out", checkout)
router.put("/:id", authenticate,authorize("HR Manager"), updateattend)
router.get("/employee/:id", authenticate,authorize("HR Manager"), getemprecords)
router.get("/:id", authenticate,authorize("HR Manager"), getemprecords) // under Develpement
router.get("/", authenticate,authorize("HR Manager"), getallrecords)

module.exports = router