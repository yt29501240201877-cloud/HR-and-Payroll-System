const mongoose = require('mongoose');
const Users = require("../Models/Users")
const JWT = require("jsonwebtoken")
const userSchema = require("./Validation/Validation")


const updaterole = async (req,res) => {
    try {

      const {error, value} = userSchema.validate(req.body, {abortEarly: false, stripUnknown: true})

      const { id } = req.params;
      const { Role } = req.body;

      if (!id) {
       return res.status(400).json({ msg: "User ID is required" });
      }

      const user = await Users.findByIdAndUpdate(id,{ Role },{new: true});

      if (!user) {
       return res.status(404).json({ msg: "User not found" });
      }

      res.status(200).json({msg: "Role Updated successfully", Users: user});

    } catch (error) {
        res.status(500).json({msg: "Server Error",error: error.message}) 
    }
}

const getuserById = async (req, res) => {
    try {

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ msg: "ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid ID" });
    }

    const data = await Users.findById(id);

    if (!data) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
}

const getallusers = async (req, res) => {
   try {

    const user = await Users.find();
        
    res.status(200).json({msg:"All Users Retrived", user})
        
   } catch (error) {
        res.status(500).json({msg: "Server Error",error: error.message}) 
   }
}

const updateUser = async (req, res) => {
  try {

    const {error, value} = userSchema.validate(req.body, {abortEarly: false, stripUnknown: true})

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

    const updatedItem = await Users.findByIdAndUpdate(id,updateData,{new: true});

    if (!updatedItem) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({msg: "User updated successfully",updatedItem});

  } catch (error) {
    res.status(500).json({msg: "Server Error",error: error.message});
  }
};

const deleteUser = async (req,res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ msg: "ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid Data" });
    }

    const deletedItem = await Users.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully", deletedItem});

  } catch (error) {
    res.status(500).json({msg: "Server Error", error: error.message});
  }
}

module.exports = {updaterole, getuserById, getallusers, updateUser, deleteUser}