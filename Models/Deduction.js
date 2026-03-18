const mongoose = require("mongoose")

const deducSchema = new mongoose.Schema({
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

const Deduction = mongoose.model("Deduction", deducSchema)

module.exports = Deduction