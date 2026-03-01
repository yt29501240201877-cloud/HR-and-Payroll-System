const Employees = require("../Models/Employees");
const mongoose = require('mongoose');

const addemployee = async(req,res) => {
    try {
        const {FirstName,LastName,Email,Phone,HireDate,Jobtitle,BasicSalary} = req.body
        
        if (!FirstName||!LastName||!Email||!Phone||!HireDate||!Jobtitle||!BasicSalary) {
            return res.status(400).json({msg:"Missing Data"})
        }
        const existEmp = await Employees.findOne({Email})
        if (existEmp) {
            return res.status(400).json({msg:"Employee aleardy exist"})
        }
        const emp = await Employees.create({FirstName,LastName,Email,Phone,HireDate,Jobtitle,BasicSalary})
          res.status(201).json({msg:"Employess Created Successfully", emp})
    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
}

module.exports = {addemployee}