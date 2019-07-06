const mongoose = require ("mongoose")

const Schema = mongoose.Schema

const packageSchema = new Schema({
    "Title": String,
    "Contents": [],
    "VideoPromotion": Number,
    "NoLessons": Number,
    "NoWorkchops": Number, 
    "NoPresentation": Number,
    "Price": Number,
    "MaxCompanies": Number
})

module.exports = mongoose.model('package', packageSchema, 'packages')