const mongoose = require("mongoose");
const { type } = require("node:os");

const depSchema = new mongoose.Schema({
    DepartmentName:{
        type: String,
        required: true,
        trim: true
    },
    Description:{
        type: String,
    }
},{timestamps: true})

const Department = mongoose.model("Department", depSchema);
module.exports = Department;