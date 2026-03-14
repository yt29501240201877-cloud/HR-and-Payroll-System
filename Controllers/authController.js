const Employees = require("../Models/Employees")
const Users = require("../Models/Users")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
const userSchema = require("./Validation/authValidation")

const register = async (req, res) => {
    try {

        const {error, value} = userSchema.validate(req.body, {abortEarly: false, stripUnknown: true})

        const {Username, PasswordHash, Role, Employee} = req.body
        
        if(!Username || !PasswordHash || !Role || !Employee) return res.status(400).json({msg: "Invalid Data"})

        // if(error){
        //     return res.status(400).json({msg: error.details.map(err => err.message)})
        // }

        const existemp = await Employees.findById(Employee)
        
        if(!existemp) return res.status(400).json({msg: "Employee isn't exist"})

        const existuser = await Users.findOne({Employee})

        if(existuser) return res.status(400).json({msg: "User Already Exist"})
        
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

    user.token = token
    
    await user.save();

    } catch (error) {
        res.status(500).json({msg: "Server Error", error: error.message});
    }
}

const logout = async (req, res) => {
    try {
        const {token} = req.body;

        if (!token) return res.status(400).json({msg: "Token is required"});
        
        const user = await Users.findOne({token});

        if (!user) return res.status(204).json({msg: "User Already Logged out"});

        user.token = null;

        await user.save();

        res.json({msg: "Logged out Successfully"});

    } catch (error) {
        res.status(500).json({msg: "Server Error", error: error.message});
    }
}

const getme = async (req, res) => {
   try {
        const userId = req.user.id;

        const user = await Users.findById(userId).populate("Employee")
        
        if(!user) return res.status(404).json({msg: "Not Found"})

        res.json({msg: "Current User", user})

   } catch (error) {
        res.status(500).json({msg: "Server Error",error: error.message}) 
   }
}
module.exports = {register, login, logout, getme}