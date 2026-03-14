const mongoose = require("mongoose")
const Allowance = require("../Models/Allowances")
const Employees = require("../Models/Employees")
const {allowSchema} = require("./Validation/allowValidation")

const getempallow = async (req, res) => {
    try {
        const {id} = req.params

        if(!id) return res.status(400).json({msg: "ID is required"})

        const record = await Allowance.find({Employee : id})

        if(!record) return res.status(404).json({msg: "Allowances not Found"})

        res.status(200).json({msg: "Employee Allowances Retrieved", record})

    } catch (error) {
        res.status(500).json({msg: "Server Error",error: error.message})
    }
}

const applyforallow = async (req, res) => {
     try {

        const {error, value} = allowSchema.validate(req.body, {abortEarly: false, stripUnknown: true})

        const {Employee, Name, Amount, IsRecurring} = value;

        if(error){
            return res.status(400).json({msg: error.details.map(err => err.message)})
        }
        
        const existemp = await Employees.findById(Employee)

        if(!existemp) return res.status(400).json({msg: "Employee isn't exist"})

        const allow = await Allowance.create({Amount, IsRecurring, Name, Employee})

        res.status(201).json({msg: "Allowance Created Successfully", data: allow})

    } catch (error) {
        res.status(500).json({msg: "Server Error", error: error.message});
    }
}

const updateallow = async (req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body;

        if (!Object.keys(updateData).length) return res.status(400).json({ msg: "No data provided for update" });
        
        const updatedItem = await Allowance.findByIdAndUpdate(id,updateData,{new: true});

        if (!updatedItem) return res.status(404).json({ msg: "Allowance not found" });

        res.status(200).json({msg: "Allowance updated successfully",updatedItem});

    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
}

const deleteleave = async (req,res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ msg: "ID is required" });

    const deletedItem = await Allowance.findByIdAndDelete(id);

    if (!deletedItem) return res.status(404).json({ msg: "Allowance not found" });

    res.status(200).json({msg: "Allowance deleted successfully", deletedItem});

  } catch (error) {
    res.status(500).json({msg: "Server Error", error: error.message});
  }
}


module.exports = {getempallow, applyforallow, updateallow, deleteleave}