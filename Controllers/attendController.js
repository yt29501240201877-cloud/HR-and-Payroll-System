const mongoose = require("mongoose")
const Attendance = require("../Models/Attendance")
const {checkinSchema, checkoutSchema} = require("./Validation/attendValidation")

const checkin = async (req, res) => {
    try {

        const {error, value} = checkinSchema.validate(req.body, {abortEarly: false, stripUnknown: true})

        const { Employee, Status } = value;

        if(error){
        return res.status(400).json({msg: error.details.map(err => err.message)})
        }

        const today = new Date();
        today.setHours(0,0,0,0);

        const CheckedEmp = await Attendance.findOne({ Employee: Employee, Date: { $gte: today }});

        if (CheckedEmp) return res.status(400).json({ msg: "Employee already checked in today" });
            
        const attendance = await Attendance.create({Employee: Employee, CheckInTime: new Date(), Date: new Date(), Status});

        res.status(201).json({ msg: "Check-in successful", attendance });

    } catch (error) {
        res.status(500).json({msg: "Server Error",error: error.message})
    }
}

const checkout = async (req, res) => {
    try {

        const {error, value} = checkoutSchema.validate(req.body, {abortEarly: false, stripUnknown: true})

        const { Employee } = value;

        if(error){
        return res.status(400).json({msg: error.details.map(err => err.message)})
        }

        const today = new Date();
        today.setHours(0,0,0,0);

        const attendance = await Attendance.findOne({Employee: Employee, Date: { $gte: today }});
        
        if (!attendance) return res.status(404).json({ msg: "Employee has not checked in today" });

        if (attendance.CheckOutTime) return res.status(400).json({ msg: "Employee already checked out" });

        attendance.CheckOutTime = new Date();

        await attendance.save();

        res.status(200).json({msg: "Check-out successful", attendance});

    } catch (error) {
        res.status(500).json({msg: "Server Error",error: error.message})
    }
}

const getallrecords = async (req, res) => {
    try {
        const attend = await Attendance.find();

        res.status(200).json({msg: "All Records Retrieved", attend})

    } catch (error) {
        res.status(500).json({msg: "Server Error",error: error.message})
    }
}

const getemprecords = async (req, res) => {
    try {
        const {id} = req.params

        if(!id) return res.status(400).json({msg: "ID is required"})

        const record = await Attendance.find({Employee : id})

        if(!record) return res.status(404).json({msg: "Records not Found"})

        res.status(200).json({msg: "Employee Records Retrieved", record})

    } catch (error) {
        res.status(500).json({msg: "Server Error",error: error.message})
    }
}

const updateattend = async (req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body

       if (!id) return res.status(400).json({ msg: "ID is required" });

       if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: "Invalid Data" });

       if (!Object.keys(updateData).length) return res.status(400).json({ msg: "No data provided for update" });

       const updatedItem = await Attendance.findByIdAndUpdate(id,updateData,{new: true});

       if (!updatedItem) return res.status(404).json({ msg: "Employee not found" });

       res.status(200).json({msg: "Status Updated Successfully", updatedItem})

    } catch (error) {
        res.status(500).json({msg: "Server Error",error: error.message})
    }
}

const attendreport = async (req, res) => {
    try {
        const { id } = req.params

        if (!id) return res.status(400).json({ msg: "ID is required" });

        const data = await Department.findById(id);

        if (!data) return res.status(404).json({ msg: "Data not found" });

        res.status(200).json({msg: "Report Retrived Successfully", data})
    } catch (error) {
        res.status(500).json({msg: "Server Error",error: error.message})
    }
    
}

module.exports = {checkin, checkout, getallrecords, getemprecords, updateattend, attendreport}

