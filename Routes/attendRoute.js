const express = require("express")

const router = express.Router()

const authenticate = require("../Middleware/authenticate");
const authorize = require("../Middleware/authorize");

const {checkin, checkout, getallrecords, getemprecords} = require("../Controllers/attendController")

router.post("/check-in", checkin)
router.post("/check-out", checkout)
router.get("/employee/:id", authenticate,authorize("HR Manager"), getemprecords)
router.get("/", authenticate,authorize("HR Manager"), getallrecords)

module.exports = router