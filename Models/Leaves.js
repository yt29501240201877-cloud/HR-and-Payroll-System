const mongoose = require("mongoose")

const leaveSchema = new mongoose.Schema({
    Amount: {
        type: String,
        required: true
    },
    IsRecurring: {
        type: Boolean,
        required: true
    },
    Type:{
        type: mongoose.Schema.ObjectId,
        ref: 'LeavesType',
        required: true
    },
    Employee: {
        type: mongoose.Schema.ObjectId,
        ref: 'Employees',
        required: true
    }
}, {timestamps: true});

const Leaves = mongoose.model("Leaves", leaveSchema)

module.exports = Leaves