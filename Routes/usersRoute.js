const express = require("express")

const router = express.Router()

const authenticate = require("../Middleware/authenticate");
const authorize = require("../Middleware/authorize");

const { register, login, logout, getme} = require('../Controllers/authController')
const { updaterole, getuserById, getallusers, updateUser, deleteUser} = require('../Controllers/userController')

router.post("/register", authenticate,authorize("Admin"),register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/me", authenticate, getme);


router.patch("/:id/role", authenticate, authorize("Admin"), updaterole);
router.put("/:id", authenticate, authorize("Admin"), updateUser);
router.get("/:id", authenticate, authorize("Admin"), getuserById);
router.delete("/:id", authenticate, authorize("Admin"), deleteUser);
router.get("/", authenticate, authorize("Admin"), getallusers);

module.exports = router;