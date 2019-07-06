const mongoose = require ("mongoose")

const Schema = mongoose.Schema

const systemSchema = new Schema({
    "CV_Enabled": Boolean,
    "Fair_Enabled": Boolean
})


module.exports = mongoose.model('system', systemSchema, 'system_settings')