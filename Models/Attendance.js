const { required, number } = require("joi")
const mongoose = require("mongoose")

const attendSchema = new mongoose.Schema({
    Date:{
        type: Date,
        required: true,
        default: Date.now()
    },
    CheckInTime:{
        type: Date
    },
    CheckOutTime:{
        type: Date
    },
    Status: {
        type: String,
        enum: ["Attend", "Absent", "Execu"],
        required: true
    },
    WorkingHours:{
        type: Number,
    },
    LateHours:{
        type: Number,
    },
    OvertimeHours:{
        type: Number
    },
    Employee:{
        type: mongoose.Schema.ObjectId,
        ref:'Employees',
        required: true
    }
}, {timestamps: true})

const Attendance = mongoose.model("Attendance", attendSchema)
module.exports = Attendance