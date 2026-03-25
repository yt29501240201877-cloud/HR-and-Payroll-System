const mongoose = require("mongoose");

const depSchema = new mongoose.Schema({
    DepartmentName:{
        type: String,
        required: true,
        trim: true
    },
    Description:{
        type: String,
    },
    Employee:[{
        type:mongoose.Schema.ObjectId,
        ref:'Employees',
        required: true
    }]       
},{timestamps: true})

const Department = mongoose.model("Departement", depSchema);

module.exports = Department;