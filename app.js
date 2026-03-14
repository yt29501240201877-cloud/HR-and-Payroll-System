require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();


app.use(express.json());


const PORT = process.env.PORT || 3000;

async function dbconnest() {
    try {
        await  mongoose.connect(process.env.URL)
        console.log("Connected Successfully");
    } catch (error) {
        console.log(error);
    }
}

dbconnest();

const DepRoute = require('./Routes/depRoute');
const employeeRoute = require('./Routes/employeesRoute');
const usersRoute = require('./Routes/usersRoute');
const attendRoute = require("./Routes/attendRoute")
const leaveRoute = require("./Routes/leavestypeRoute")
const allowRoute = require("./Routes/allowRoute")

app.use('/departments',DepRoute);
app.use('/employees',employeeRoute);
app.use('/users',usersRoute);
app.use('/attendance',attendRoute);
app.use('/leaves', leaveRoute);
app.use('/allowances', allowRoute);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
