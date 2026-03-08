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
    OvertimeHours:{
        type: Date
    },
    Employee:{
        type: mongoose.Schema.ObjectId,
        ref:'Employees',
        required: true
    }
}, {timestamps: true})

const Attendance = mongoose.model("Attendance", attendSchema)
module.exports = Attendance