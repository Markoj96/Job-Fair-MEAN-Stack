// Require the packages
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

// Port number to run Express Server on
const PORT = 3000

const api = require("./routes/api")

// Instance of express
const app = express()

// Create instance of cors. 
// Cors is used because our frontend runs on 4200
// And our backend runs on 3000
app.use(cors())

// Body parser to handle JSON
app.use(bodyParser.json())

//
app.use("/api", api)

// Test the GET request
app.get("/", function(request, response){
    response.send("Hello from Server")
})

// Listen to requests on specific port
app.listen(PORT, function(){
    console.log("Server running on localhost " + PORT)
})