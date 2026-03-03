const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    Username:{
        type:String,
        required: true,
        unique: true
    },
    PasswordHash:{
        type:String,
        required: true,
        minlength: 8
    },
    Role:{
        type:String,
        enum: ["Admin","HR Manager","Accountant"]
    },
    Employee:{
        type: mongoose.Schema.ObjectId,
        ref: 'Employees',
        required: true
    }
},{timestamps: true});

const Users = mongoose.model("Users",userSchema)

module.exports = Users