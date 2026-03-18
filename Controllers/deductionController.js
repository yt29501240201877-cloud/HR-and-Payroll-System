const mongoose = require("mongoose")
const Deduction = require("../Models/Deduction")
const Employees = require("../Models/Employees")
const {deducSchema} = require("./Validation/deductionValidation")

const getempdeduc = async (req, res) => {
    try {
        const {id} = req.params

        if(!id) return res.status(400).json({msg: "ID is required"})

        const record = await Deduction.find({Employee : id})

        if(!record) return res.status(404).json({msg: "Deductions not Found"})

        res.status(200).json({msg: "Employee Deductions Retrieved", record})

    } catch (error) {
        res.status(500).json({msg: "Server Error",error: error.message})
    }
}

const applyfordeduc = async (req, res) => {
     try {

        const {error, value} = deducSchema.validate(req.body, {abortEarly: false, stripUnknown: true})

        const {Employee, Name, Amount, IsRecurring} = value;

        if(error){
            return res.status(400).json({msg: error.details.map(err => err.message)})
        }
        
        const existemp = await Employees.findById(Employee)

        if(!existemp) return res.status(400).json({msg: "Employee isn't exist"})

        const allow = await Deduction.create({Amount, IsRecurring, Name, Employee})

        res.status(201).json({msg: "Deduction Created Successfully", data: allow})

    } catch (error) {
        res.status(500).json({msg: "Server Error", error: error.message});
    }
}

const updatededuc = async (req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body;

        if (!Object.keys(updateData).length) return res.status(400).json({ msg: "No data provided for update" });
        
        const updatedItem = await Deduction.findByIdAndUpdate(id,updateData,{new: true});

        if (!updatedItem) return res.status(404).json({ msg: "Deduction not found" });

        res.status(200).json({msg: "Deduction updated successfully",updatedItem});

    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
}

const deletededuc = async (req,res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ msg: "ID is required" });

    const deletedItem = await Deduction.findByIdAndDelete(id);

    if (!deletedItem) return res.status(404).json({ msg: "Deduction not found" });

    res.status(200).json({msg: "Deduction deleted successfully", deletedItem});

  } catch (error) {
    res.status(500).json({msg: "Server Error", error: error.message});
  }
}


module.exports = {getempdeduc, applyfordeduc, updatededuc, deletededuc}