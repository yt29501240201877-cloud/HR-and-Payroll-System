const mongoose = require("mongoose")

const leaveSchema = new mongoose.Schema({
    TypeName: {
        type: String,
        required: true
    },
    MaxDaysPerYear: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const LeavesTypes = mongoose.model("LeavesType", leaveSchema)

module.exports = LeavesTypes