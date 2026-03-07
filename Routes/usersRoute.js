const express = require("express")

const router = express.Router()

const authenticate = require("../Middleware/authenticate");
const authorize = require("../Middleware/authorize");

const { register, login, logout, getme} = require('../Controllers/authController')

router.post("/register", authenticate,authorize("Admin"),register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/me", authenticate, getme);

module.exports = router;