const express = require("express")

const router = express.Router()

const { addemployee } = require('../Controllers/employeesController')

router.post("/", addemployee)

module.exports = router;