const Employees = require("../Models/Employees")
const Users = require("../Models/Users")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")

const register = async (req, res) => {
    try {

        const {Username, PasswordHash, Role, Employee} = req.body
        
        if(!Username || !PasswordHash || !Role || !Employee) return res.status(400).json({msg: "Invalid Data"})

        const existemp = await Employees.findById(Employee)
        
        if(!existemp) return res.status(400).json({msg: "Employee isn't exist"})
        
        const password = await bcrypt.hash(PasswordHash,10)

        const user = await Users.create({Username, PasswordHash: password, Role, Employee})

        res.status(201).json({msg: "User Created Successfully", data: user})

    } catch (error) {
            res.status(500).json({msg: "Server Error", error: error.message});
    }
}

const login = async (req, res) => {
    try {
    const {Username, PasswordHash} = req.body

    if(!Username || !PasswordHash) return res.status(400).json({msg: "Invalid Data"})

    const user = await Users.findOne({Username})

    if(!user) return res.status(400).json({msg: "Account isn't exist"})

    const matchpass = await bcrypt.compare(PasswordHash, user.PasswordHash)

    if(!matchpass) return res.status(400).json({msg: "Invalid Password"})

    const token = JWT.sign({id:user._id, role: user.Role}, process.env.JWT_SECRET, {expiresIn: "1d"})

    res.status(200).json({msg: "Success Login", token})

    } catch (error) {
        res.status(500).json({msg: "Server Error", error: error.message});
    }
}

module.exports = {register, login}