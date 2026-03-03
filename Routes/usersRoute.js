const express = require("express")

const router = express.Router()

const authenticate = require("../Middleware/authenticate");
const authorize = require("../Middleware/authorize");

const { register, login} = require('../Controllers/authController')

router.post("/register", authenticate,authorize("Admin"),register)
router.post("/login", login)


module.exports = router;