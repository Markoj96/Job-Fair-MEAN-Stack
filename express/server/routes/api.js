// Imports
const express = require("express")
const mongo = require("mongodb")
const multer = require("multer")
const router = express.Router()

const User = require("../models/user")
const CV = require("../models/cv")
const System = require("../models/system")
const Token = require("../models/token")
const Competition = require("../models/competition")
const Fair = require("../models/fair")
const Package = require("../models/package")
const Additional = require("../models/additional")

const mongoose = require("mongoose")
const db = "mongodb://localhost:27017/pia"
const jwt = require("jsonwebtoken")

mongoose.connect(db, error => {
    if(error) 
    {
        console.error("Error ", error)
    }
    else
    {
        console.log("Connected to mongodb ")
    }
})

function verifyToken(request, response, next)
{
    if(!request.headers.authorization)
    {
        return response.status(401).send("Unauthorized request")
    }

    // Bearer [0] , Token [1]
    let token = request.headers.authorization.split(" ")[1]
    if(token === "null")
    {
        return response.status(401).send("Unauthorized request")
    }

    let payload = jwt.verify(token, "secretKey")
    if(!payload)
    {
        return response.status(401).send("Unauthorized request")
    }

    request.userID = payload.subject
    next()
}

router.get("/", (request, response) => {
    response.send("From API route")
})

////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////// USER
router.post("/register", async (request, response) => {
    let userData = request.body
    userData.Administrator = false

    if(userData.Company_Name)
    {
        userData.Type = "Company"
    }  
    else
    {
        userData.Type = "Student"
    }

    try
    {
        let UsernameExists = await User.findOne({"Username": userData.Username})
        if(UsernameExists)
        {
            return response.status(409).send({UsernameTaken: "Username already taken", EmailTaken: null})
        }
        
        let EmailExist = await User.findOne({"Email": userData.Email})
        if(EmailExist)
        {
            return response.status(409).send({EmailTaken: "Email already taken", UsernameTaken: null})
        }

        let user = new User(userData)
        user.save((error, registeredUser) => {
            if(error)
            {
                console.log(error)
            }
            else
            {
                let payload = { "subject": registeredUser._id}

                let token = jwt.sign(payload, "secretKey", { expiresIn: "2 days" })

                let newTokenUsername = new Token({"Token": token, "Username": userData.Username, "Type": userData.Type})
                newTokenUsername.save()

                response.status(200).send({"Token": token, "Type": user.Type, "Administrator": user.Administrator})
            }
        })    
    }
    catch(e)
    {
        console.log(e)
    }
})

router.post("/login", (request, response) => {
    let userData = request.body

    User.findOne({ "Email" : userData.Email}, (error, user) => {
        if(error)
        {
            console.log(error)
        }
        else
        {
            if(!user)
            {
                response.status(404).send({message: "Invalid email!"})
            }
            else if(user.Password !== userData.Password)
            {
                response.status(404).send({message: "Invalid password!"})
            }
            else
            {
                let payload = { "subject": user._id }
                
                let token = jwt.sign(payload, "secretKey", { expiresIn: "2 day" })
                
                let newTokenUsername = new Token({"Token": token, "Username": user.Username, "Type": user.Type})
                
                newTokenUsername.save()
                response.status(200).send({"Token": token, "Type": user.Type, "Administrator": user.Administrator})
            }
        }
    })
})

router.post("/change_password", (request, response) => {
    let userData = request.body
    User.findOne({ "Email" : userData.email}, (error, user) => {
        if(error)
        {
            console.log(error)
        }
        else
        {
            if(!user)
            {
                response.status(404).send({message: "Invalid email!"})
            }
            else if(user.Password !== userData.currentPassword)
            {
                response.status(404).send({message: "Invalid password!"})
            }
            else
            {
                User.updateOne({"Email" : userData.email }, {$set: {"Password" : userData.newPassword}})
                response.status(200).send({message: "Successfully changed password"})
            }
        }
    })
})

router.post("/get_username", verifyToken, (request, response) => {
    let userData = request.body
    Token.findOne({ "Token": userData.Token }, (error, token) => {
        if(token)
        {
            response.status(200).send(token)
        }   
        else
        {
            response.status(404).send({})
        } 
    })
})
////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////// CURRICULUM VITAES
router.post("/curriculum_vitae", verifyToken, (request, response) => {
    let cvData = request.body
    CV.findOne({ "Username" : cvData.Username}, (error, cv) => {
        if(cv)
        {
            response.status(200).send({cv})
        }
        else
        {
            response.status(404).send({})
        }        
    })
})

router.post("/curriculum_vitae_update", verifyToken, (request, response) => {
    let cvData = request.body
    CV.updateOne({ "Username" : cvData.Username }, cvData, { upsert : true }, (error, result) => {
        if(error)
        {
            response.status(404).send()
        }
        else
        {
            response.status(200).send()
        }
    })        
})

router.get("/curriculum_vitae/show/:id", verifyToken, async (request, response) => {
    let userID = request.params.id
    let user = await User.findOne({"_id": mongo.ObjectID(userID)})
    if(!user)
    {
        response.status(404).send()
    }

    CV.findOne({"Username": user.Username}, (error, cv) => {
        if(error)
        {
            response.status(404).send()
        }
        else
        {
            response.status(200).send(cv)
        }
    })
})

router.post("/student_search", verifyToken, async (request, response) => {
    let searchData = request.body
    let returnResult = 
    {
        Companies: [],
        JobCompetitions: [],
        InternshipCompetitions: []
    }
    try
    {
        if(searchData.CompanyName.length > 0)
        {
            returnResult.Companies = await User.find({"Company_Name":{$regex: searchData.CompanyName}})
        }
            
        
        if(searchData.CompetitionTitle.length > 0 && searchData.JobSearch == true)
        {
            returnResult.JobCompetitions = await Competition.find({"Title":{$regex: searchData.CompetitionTitle}, "Type": "Job"})
        }

        if(searchData.CompetitionTitle.length > 0 && searchData.InternshipSearch == true)            
        {
            returnResult.InternshipCompetitions = await Competition.find({"Title":{$regex: searchData.CompetitionTitle}, "Type": "Internship"})
        }
    }
    catch(e)
    {
        console.log(e)
    }

    if(returnResult.Companies.length == 0 && returnResult.JobCompetitions.length == 0 && returnResult.InternshipCompetitions.length == 0)
    {
        response.status(404).send({})
    }
    else
    {
        response.status(200).send(returnResult)
    }
})

router.post("/guest_search", (request, response) => {
    let searchData = request.body
    let searchQuery = { }

    if(searchData.CompanyName.length > 0)
    {
        searchQuery["Company_Name"] = searchData.CompanyName
    }

    if(searchData.CompanyActivities.length > 0)
    {
        searchQuery["Activity"] = {$in: searchData.CompanyActivities}    
    }
        

    if(searchData.CompanyCity)
    {
        searchQuery["Address"] = {$regex: searchData.CompanyCity}
    }

    User.find(searchQuery, (error, result) => {
        if(error)
        {
            response.status(404).send({ })
        }
        else
        {
            response.status(200).send(result)
        }
    })
})
////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////// COMPANIES
router.get("/companies/show/:id", (request, response) => {
    let companyID = request.params.id
    User.findById({"_id": companyID}, (error, result) => {
        if(result)
        {
            response.status(200).send(result)
        }
        else
        {
            response.status(404).send({ })
        }
    })
})
////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////// COMPETITION
router.get("/competitions/show/:id", verifyToken, (request, response) => {
    let competitionID = request.params.id
    Competition.findById({"_id": competitionID}, (error, result) => {
        if(result)
        {
            response.status(200).send(result)
        }
        else
        {
            response.status(404).send({ })
        }
    })
})

router.post("/competitions/register/:id", verifyToken, async (request, response) => {
    try 
    {
        let competitionID = request.params.id
        let data = request.body
        let userData = { }

        let token = await Token.findOne({"Token": data.Token})
        if(!token)
        {
            return response.status(404).send()
        }

        userData.Username = token.Username
        let user = await User.findOne({"Username": userData.Username})
        if(!user)
        {
            return response.status(404).send()
        }

        let cv = await CV.findOne({"Username": userData.Username})
        if(cv)
        {
            userData.CV = cv._id
        }
        else
        {
            userData.CV = null
        }

        userData._id = user._id
        userData.Username = user.Username
        userData.First_Name = user.First_Name
        userData.Last_Name = user.Last_Name
        userData.CoverLetterText = data.coverLetter.Text
        userData.CoverLetterFile = data.coverLetter.File
        userData.Approved = false

        Competition.updateOne({"_id": competitionID}, {$push: {"Registered_Users":{"_id": userData._id, "Username": userData.Username, "First_Name": userData.First_Name, "Last_Name": userData.Last_Name, "CoverLetterText": userData.CoverLetterText, "CoverLetterFile": userData.CoverLetterFile, "Approved": userData.Approved, "CV": userData.CV }}}, (error, result) => {
            if(result)
            {
                response.status(200).send(result)
            }
            else
            {
                response.status(400).send()
            }
        })
    }
    catch(e)
    {
        console.log(e)
    }
})

router.post("/competitions/approve/:id", verifyToken, async (request, response) => {
    try 
    {
        let userID = request.params.id
        let data = request.body

        let token = await Token.findOne({"Token": data.Token})
        if(!token)
        {
            return response.status(404).send()
        }
        
        Competition.updateOne({"Registered_Users._id": mongo.ObjectID(userID)}, {"$set": {"Registered_Users.$.Approved": true}}, (error, result) => {
            if(result)
            {
                console.log(result)
                response.status(200).send(result)
            }
            else
            {
                response.status(400).send()
            }
        })
    }
    catch(e)
    {
        console.log(e)
    }
})

router.post("/competitions/add", verifyToken, async (request, response) => {
    try
    {
        let data = request.body

        let token = await Token.findOne({"Token": data.Token})

        let user = await User.findOne({"Username": token.Username})
        if(!user)
        {
            return response.status(401).send()
        }

        data["Company_ID"] = user._id

        let competition = new Competition(data)
        competition.save()
        return response.status(200).send(competition)
    }
    catch(e)
    {
        console.log(e)
    }
})

router.post("/competitions/company_list", verifyToken, async (request, response) => {
    try
    {
        let data = request.body
        let token = await Token.findOne({"Token": data.Token})

        let user = await User.findOne({"Username": token.Username})
        if(!user)
        {
            return response.status(401).send()
        }

        Competition.find({"Company_ID": user._id}, (error, result) => {
            if(error)
            {
                return response.status(404).send()     
            }
            else
            {
                response.status(200).send(result)
            }
        })
    }
    catch(e)
    {
        console.log(e)
    }
})

router.post("/competitions/student_list", verifyToken, async (request, response) => {
    try
    {
        let data = request.body
        let token = await Token.findOne({"Token": data.Token})

        let user = await User.findOne({"Username": token.Username})
        if(!user)
        {
            return response.status(401).send()
        }

        Competition.find({"Registered_Users._id": user._id}, (error, result) => {
            if(error)
            {
                return response.status(404).send()     
            }
            else
            {
                response.status(200).send(result)
            }
        })
    }
    catch(e)
    {
        console.log(e)
    }
})
////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////// SYSTEM
router.post("/check_user", verifyToken, async (request, response) => {
    try
    {
        let token = await Token.findOne({"Token": request.body.Token})
        if(!token)
        {
            response.status(401).send()
        } 

        let user = await User.findOne({"Username": token.Username})
        if(user.Type != request.body.Type || user.Administrator.toString() != request.body.Administrator)
        {
            response.status(401).send()
        }
        else
        {
            response.status(200).send()
        }
    }
    catch(e)
    {
        console.log(e)
    }
})

router.get("/system_settings/get", verifyToken, (request, response) => {
    System.findOne({}, (error, result) => {
        if(error)
        {
            response.status(404).send()
        }
        else
        {
            response.status(200).send(result)
        }
    })
})

router.post("/system_settings/set", verifyToken, (request, response) => {
    let data = request.body
    System.updateMany({}, {$set:data}, (error, result) => {
        if(error)
        {
            response.status(404).send()
        }
        else
        {
            response.status(200).send(result)
        }
    })
})
////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////// PACKAGES
router.get("/packages/list", verifyToken, (request, response) => {
    Package.find({}, (error, result) => {
        if(error)
        {
            response.status(404).send()
        }
        else
        {
            response.status(200).send(result)
        }
    })
})

router.get("/packages/show/:id", verifyToken, (request, response) => {
    let packageID = request.params.id
    Package.findById({"_id": packageID}, (error, result) => {
        if(result)
        {
            response.status(200).send(result)
        }
        else
        {
            response.status(404).send()
        }
    })
})

router.post("/packages/update/:id", verifyToken, (request, response) => {
    let packageID = request.params.id
    let data = request.body
    Package.updateOne({"_id": mongo.ObjectID(packageID)}, data, (error, result) => {
        if(error)
        {
            return response.status(404).send()
        }
        else
        {
            return response.status(200).send()
        }
    })
})

router.post("/packages/add", verifyToken, (request, response) => {
    let data = request.body
    let package = new Package()

    package.Title = data.Title
    package.Contents = data.Contents
    package.VideoPromotion = data.VideoPromotion
    package.NoLessons = data.NoLessons
    package.NoWorkchops = data.NoWorkchops
    package.NoPresentation = data.NoPresentation
    package.Price = data.Price
    package.MaxCompanies = data.MaxCompanies
    package.save()

    response.status(200).send(package)
})
////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////// ADITIONALS
router.get("/additionals/list", verifyToken, (request, response) => {
    Additional.find({}, (error, result) => {
        if(error)
        {
            return response.status(404).send()
        }
        else
        {
            return response.status(200).send(result)
        }
    })
})

router.get("/additionals/show/:id", verifyToken, (request, response) => {
    let additionalID = request.params.id
    Additional.findById({"_id": additionalID}, (error, result) => {
        if(result)
        {
            return response.status(200).send(result)
        }
        else
        {
            return response.status(404).send()
        }
    })
})

router.post("/additionals/update/:id", verifyToken, (request, response) => {
    let additionalID = request.params.id
    let data = request.body
    Additional.updateOne({"_id": mongo.ObjectID(additionalID)}, data, (error, result) => {
        if(error)
        {
            return response.status(404).send()
        }
        else
        {
            return response.status(200).send()
        }
    })
})

router.post("/additionals/add", verifyToken, (request, response) => {
    let data = request.body
    let additional = new Additional()

    additional.Title = data.Title
    additional.Price = data.Price
    additional.save()

    return response.status(200).send(additional)
})
////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////// FAIRS
router.post("/fairs/add-package", verifyToken, (request, response) => {
    let data = request.body
    let i = 0
    console.log(data)
    for(i = 0; i < data.Packages.length; i++)
    {
        let package = new Package()

        package.Title = data.Packages[i].Title
        package.Contents = data.Packages[i].Content
        package.VideoPromotion = parseInt(data.Packages[i].VideoPromotion)
        package.NoLessons = parseInt(data.Packages[i].NoLessons)
        package.NoWorkchops = parseInt(data.Packages[i].NoWorkchops)
        package.NoPresentation = parseInt(data.Packages[i].NoPresentation)
        package.Price = parseInt(data.Packages[i].Price)
        if(data.Packages[i].MaxCompanies != "-")
            package.MaxCompanies = parseInt(data.Packages[i].MaxCompanies)
        else
            package.MaxCompanies = 9999
        package.save()
    }

    for(i = 0; i < data.Additional.length; i++)
    {
        let additional = new Additional()

        additional.Title = data.Additional[i].Title
        additional.Price = data.Additional[i].Price

        additional.save()
    }

    return response.status(200).send()
})

router.post("/fairs/add-fair", verifyToken, (request, response) => {
    let data = request.body
    let i = 0

    for(i = 0; i < data.Fairs.length; i++)
    {
        let fair = new Fair()
        fair.Fair = data.Fairs[i].Fair
        fair.StartDate = data.Fairs[i].StartDate
        fair.EndDate = data.Fairs[i].EndDate
        fair.StartTime = data.Fairs[i].StartTime
        fair.EndTime = data.Fairs[i].EndTime
        fair.Place = data.Fairs[i].Place
        fair.About = data.Fairs[i].About 
        fair.Locations = data.Locations

        fair.save()
    }
    
    return response.status(200).send()
})

router.get("/fairs/list", verifyToken, (request, response) => {
    Fair.find({}, (error, result) => {
        if(error)
        {
            return response.status(404).send()
        }
        else
        {
            return response.status(200).send(result)
        }
    })
})

router.get("/fairs/show/:id", verifyToken, (request, response) => {
    let fairID = request.params.id
    Fair.findById({"_id": fairID}, (error, result) => {
        if(result)
        {
            return response.status(200).send(result)
        }
        else
        {
            return response.status(404).send()
        }
    })
})
module.exports = router 