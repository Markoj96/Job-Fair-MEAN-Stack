const mongoose = require ("mongoose")

const Schema = mongoose.Schema

const fairSchema = new Schema({
    "Fair": String,
    "StartDate": String,
    "EndDate": String,
    "StartTime": String,
    "EndTime": String,
    "Place": String,
    "About": String,
    "Locations": 
    [
        {
            "Place": String,
            "Location": 
            [
                {
                    "Name": String
                }
            ]
        }
    ],
    "Status": String
})

module.exports = mongoose.model('fair', fairSchema, 'fairs')