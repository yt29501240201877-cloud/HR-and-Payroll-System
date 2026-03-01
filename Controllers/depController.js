const Department = require("../Models/Departement")
const mongoose = require('mongoose');

const adddepartment = async (req,res) => {
    try {
        const {DepartmentName,Description} = req.body;
        if (!DepartmentName) {
            return res.status(400).json({msg:"Missing Data"})
        }
        const existDep = await Department.findOne({DepartmentName});
        if (existDep) {
            return res.status(400).json({msg:"Department aleardy exist"});
        }
        const dep = await Department.create({DepartmentName,Description})
        res.status(201).json({msg:"Department Created Successfully", dep})
    } catch (error) {
        console.log(error); 
    }
}

const getdepartment = async (req,res) => {
    try {
        const dep = await Department.find();
        res.status(200).json({msg:"All Department Retrived", dep})
    } catch (error) {
        console.log(error);
        
    }
}

const getdepartmentById = async (req, res) => {
    try {

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ msg: "ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid ID" });
    }

    const data = await Department.findById(id);

    if (!data) {
      return res.status(404).json({ msg: "Department not found" });
    }

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }

}

const deleteDepartment = async (req,res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ msg: "ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid Data" });
    }

    const deletedItem = await Department.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ msg: "Department not found" });
    }

    res.status(200).json({
      message: "Department deleted successfully", deletedItem});

  } catch (error) {
    res.status(500).json({msg: "Server Error", error: error.message});
  }
}

const updateDepartment = async (req, res) => {
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

    const updatedItem = await Department.findByIdAndUpdate(id,updateData,{new: true});

    if (!updatedItem) {
      return res.status(404).json({ msg: "Department not found" });
    }

    res.status(200).json({msg: "Department updated successfully",updatedItem});

  } catch (error) {
    res.status(500).json({msg: "Server Error",error: error.message});
  }
};

module.exports = {adddepartment, getdepartment, getdepartmentById, deleteDepartment, updateDepartment}