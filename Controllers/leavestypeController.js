const LeavesType = require("../Models/LeavesType")
const Leaves = require("../Models/Leaves")
const Employees = require("../Models/Employees")
const mongoose = require("mongoose")
const {leavetypeSchema, leaveSchema} = require("./Validation/leaveValidation")

const addleave = async (req, res) => {
    try {

        const {error, value} = leavetypeSchema.validate(req.body, {abortEarly: false, stripUnknown: true})

        const {TypeName, MaxDaysPerYear} = value

        if(error){
            return res.status(400).json({msg: error.details.map(err => err.message)})
        }

        const leaves = await LeavesType.create({TypeName, MaxDaysPerYear})

        res.status(201).json({msg:"Leaves Type Created Successfully", leaves})

    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
}

const getleave = async (req, res) => {
    try {
        const leaves = await LeavesType.find()

        res.status(200).json({msg:"All Leaves Types Retrived", leaves})

    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: error.message });
    }    
}

const updateleave = async (req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body;

        if (!Object.keys(updateData).length) return res.status(400).json({ msg: "No data provided for update" });
        
        const updatedItem = await LeavesType.findByIdAndUpdate(id,updateData,{new: true});

        if (!updatedItem) return res.status(404).json({ msg: "Leave Type not found" });

        res.status(200).json({msg: "Leave Type updated successfully",updatedItem});

    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
}

const deleteleave = async (req,res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ msg: "ID is required" });

    const deletedItem = await LeavesType.findByIdAndDelete(id);

    if (!deletedItem) return res.status(404).json({ msg: "Leave Type not found" });

    res.status(200).json({msg: "Leave Type deleted successfully", deletedItem});

  } catch (error) {
    res.status(500).json({msg: "Server Error", error: error.message});
  }
}

const applyforleave = async (req, res) => {
     try {

        const {error, value} = leaveSchema.validate(req.body, {abortEarly: false, stripUnknown: true})

        const {Employee, Type, Amount, IsRecurring} = value

        if(error){
            return res.status(400).json({msg: error.details.map(err => err.message)})
        }

        const existemp = await Employees.findById(Employee)

        if(!existemp) return res.status(400).json({msg: "Employee isn't exist"})

        const existtype = await LeavesType.findById(Type)

        if(!existtype) return res.status(400).json({msg: "Type isn't Exist"})

        const leave = await Leaves.create({Amount, IsRecurring, Type, Employee})

        res.status(201).json({msg: "Leave Created Successfully", data: leave})

    } catch (error) {
        res.status(500).json({msg: "Server Error", error: error.message});
    }
}

const getallEmpleave = async (req, res) => {
    try {
        const leaves = await Leaves.find()

        res.status(200).json({msg:"All Leaves Retrived", leaves})

    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: error.message });
    }    
}

const getempleaves = async (req, res) => {
    try {
        const {id} = req.params

        if(!id) return res.status(400).json({msg: "ID is required"})

        const record = await Leaves.find({Employee : id})

        if(!record) return res.status(404).json({msg: "Records not Found"})

        res.status(200).json({msg: "Employee Records Retrieved", record})

    } catch (error) {
        res.status(500).json({msg: "Server Error",error: error.message})
    }
}

const approveleave = async (req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body;

        if (!Object.keys(updateData).length) return res.status(400).json({ msg: "No data provided for update" });
        
        const updatedItem = await Leaves.findByIdAndUpdate(id,updateData,{new: true});

        if (!updatedItem) return res.status(404).json({ msg: "Leave not found" });

        res.status(200).json({msg: "Leave updated successfully",updatedItem});

    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
}

const rejectleave = async (req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body;

        if (!Object.keys(updateData).length) return res.status(400).json({ msg: "No data provided for update" });
        
        const updatedItem = await Leaves.findByIdAndUpdate(id,updateData,{new: true});

        if (!updatedItem) return res.status(404).json({ msg: "Leave not found" });

        res.status(200).json({msg: "Leave updated successfully",updatedItem});

    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
}

module.exports = {addleave, getleave, updateleave, deleteleave, applyforleave, getallEmpleave, getempleaves, approveleave, rejectleave}