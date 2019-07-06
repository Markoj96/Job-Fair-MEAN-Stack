const mongoose = require("mongoose")
const mongo = require("mongodb")
const Schema = mongoose.Schema

const competitionSchema = new Schema({
    "Company_ID": mongo.ObjectId,
    "Title": String, 
    "Description": String,
    "Type": String, 
    "DateTo": Date,
    "Registered_Users": [],
    "Files": []
})

module.exports = mongoose.model('competition', competitionSchema, 'competitions')