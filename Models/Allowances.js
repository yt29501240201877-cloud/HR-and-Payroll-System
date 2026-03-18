const mongoose = require("mongoose")

const allowSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    Amount: {
        type: String,
        required: true
    },
    IsRecurring: {
        type: Boolean,
        required: true
    },
    Employee: {
        type: mongoose.Schema.ObjectId,
        ref: 'Employees',
        required: true
    }
}, {timestamps: true});

const Allowances = mongoose.model("Allowances", allowSchema)

module.exports = Allowances