const mongoose = require ("mongoose")

const Schema = mongoose.Schema

const additionalSchema = new Schema({
    "Title": String,
    "Price": Number
})

module.exports = mongoose.model('additional', additionalSchema, 'additionals')