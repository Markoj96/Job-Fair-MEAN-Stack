const mongoose = require ("mongoose")

const Schema = mongoose.Schema

const tokenSchema = new Schema({
    "Token": String,
    "Username": String,
    "Type": String,
    "Expire_At": 
    {
        type: Date, 
        default: Date.now, 
        expires: 172800
    } 
})


module.exports = mongoose.model('token', tokenSchema, 'tokens')