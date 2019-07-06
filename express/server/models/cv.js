const mongoose = require ("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
    // Personal Info
    "Username": String,
    "First_Name": String,
    "Last_Name": String,
    "Birth_Date": Date,
    "Postal_Code": String,
    "City": String,
    "Country": String,
    "Phone": String,
    "Email": String,
    "WEB_Site": String,
    // Work experience
    "Work_Experience": [],
    // Education and training
    "Education_Training": [],
    // Personal skills
    "Mother_Tongues": [],
    "Foreign_Languages": [],
    "Communication_Skills": [],
    "Organisational_Managerial_Skills": [],
    "Job_Related_Skills": [],
    "Changed_Times": Number,
    "Digital_Skills": []   
})

module.exports = mongoose.model('curriculum_vitae', userSchema, 'curriculum_vitaes')