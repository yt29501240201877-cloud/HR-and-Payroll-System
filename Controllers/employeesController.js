const Employees = require("../Models/Employees");
const mongoose = require('mongoose');

const addemployee = async(req,res) => {
    try {
        const {FirstName,LastName,Email,Phone,HireDate,Jobtitle,BasicSalary,Status} = req.body
        
        if (!FirstName||!LastName||!Email||!Phone||!HireDate||!Jobtitle||!BasicSalary||!Status) {
            return res.status(400).json({msg:"Missing Data"})
        }
        const existEmp = await Employees.findOne({Email})

        if (existEmp) {
            return res.status(400).json({msg:"Employee aleardy exist"})
        }
        const emp = await Employees.create({FirstName,LastName,Email,Phone,HireDate,Jobtitle,BasicSalary,Status})
        res.status(201).json({msg:"Employess Created Successfully", emp})

    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
}

const getemployee = async (req,res) => {
    try {
        const emp = await Employees.find();
        res.status(200).json({msg:"All Employees Retrived", emp})
    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: error.message }); 
    }
}

const getemployeeById = async (req, res) => {
    try {

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ msg: "ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid ID" });
    }

    const data = await Employees.findById(id);

    if (!data) {
      return res.status(404).json({ msg: "Employee not found" });
    }

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
}

const deleteEmployee = async (req,res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ msg: "ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid Data" });
    }

    const deletedItem = await Employees.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ msg: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee deleted successfully", deletedItem});

  } catch (error) {
    res.status(500).json({msg: "Server Error", error: error.message});
  }
}

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      return res.status(400).json({ msg: "ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid Data" });
    }

    if (!Object.keys(updateData).length) {
      return res.status(400).json({ msg: "No data provided for update" });
    }

    const updatedItem = await Employees.findByIdAndUpdate(id,updateData,{new: true});

    if (!updatedItem) {
      return res.status(404).json({ msg: "Employee not found" });
    }

    res.status(200).json({msg: "Employee updated successfully",updatedItem});

  } catch (error) {
    res.status(500).json({msg: "Server Error",error: error.message});
  }
};

// const EmployeeStatus


module.exports = {addemployee, getemployee, getemployeeById, deleteEmployee, updateEmployee}