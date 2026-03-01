const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
    FirstName:{
        type: String,
        required: true,
        trim: true
    },
    LastName:{
        type: String,
        required: true,
        trim: true
    },
    Email:{
        type: String,
        required: true,
        unique : true,
        lowercase: true
    },
    Phone:{
        type: String,
        trim: true
    },
    HireDate:{
        type: Date,
        default: Date.now
    },
    Jobtitle:{
        type: String,
        required: true
    },
    BasicSalary:{
        type: Number,
        min: 0
    }
},{timestamps: true});

const Employees = mongoose.model("Employees", employeeSchema);
module.exports = Employees;