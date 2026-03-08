const mongoose = require("mongoose")
const Attendance = require("../Models/Attendance")

const checkin = async (req, res) => {
    try {
       const { Id } = req.body;

        if (!Id) return res.status(400).json({ msg: "Employee ID required" });

        const today = new Date();
        today.setHours(0,0,0,0);

        const CheckedEmp = await Attendance.findOne({ Employee: Id, Date: { $gte: today }});

        if (CheckedEmp) return res.status(400).json({ msg: "Employee already checked in today" });

        const attendance = await Attendance.create({Employee: Id, CheckInTime: new Date(), Date: new Date()});

        res.status(201).json({ msg: "Check-in successful", attendance });

    } catch (error) {
        res.status(500).json({msg: "Server Error",error: error.message})
    }
}

const checkout = async (req, res) => {
    try {
        const { Id } = req.body;

        if (!Id) return res.status(400).json({ msg: "Employee ID required" });

        const today = new Date();
        today.setHours(0,0,0,0);

        const attendance = await Attendance.findOne({Employee: Id, Date: { $gte: today }});
        
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


module.exports = {checkin, checkout, getallrecords, getemprecords}