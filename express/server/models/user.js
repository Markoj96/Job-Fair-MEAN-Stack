const mongoose = require("mongoose")
const mongo = require("mongodb")

const Schema = mongoose.Schema

const userSchema = new Schema({
    "Username": String,
    "Password": String,
    "Email": String,
    "Administrator": Boolean,
    "Type": String,
    // User
    "First_Name": String,
    "Last_Name": String,
    "Phone": Number,
    // Company
    "Company_Name": String,
    "Address": String,
    "Director_FirstName": String,
    "Director_LastName": String,
    "TIN": String,
    "Employees": Number,
    "WEB": String,
    "Activity": String,
    "Special_Activity": String,
    // Student
    "Bachelors_Degree": Number,
    "Graduated": String,
})

module.exports = mongoose.model('user', userSchema, 'users')