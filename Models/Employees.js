const { required } = require("joi");
const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
    FirstName:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
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
    },
    Status:{
        type: String,
<<<<<<< HEAD
        enum: ["Active","Inactive"],
=======
        enum: ["Active","Diactive"],
>>>>>>> e1feb8a550e99c562ec7cacb8457a28f79216e7a
        default: "Active"
    },
    Departement:[{
        type:mongoose.Schema.ObjectId,
        ref:'Departement',
<<<<<<< HEAD
        required: false
=======
        required: true
>>>>>>> e1feb8a550e99c562ec7cacb8457a28f79216e7a
    }]
},{timestamps: true});

const Employees = mongoose.model("Employees", employeeSchema);
<<<<<<< HEAD

=======
>>>>>>> e1feb8a550e99c562ec7cacb8457a28f79216e7a
module.exports = Employees;