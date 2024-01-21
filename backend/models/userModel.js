const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userID : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required:true
    },
    name : {
        type : String,
        trim : true
    },
    imgPath : {
        type : String
    },
    accepted : {
        type : Boolean,
        default : false
    },
    role : {
        type : Number ,
        default : 1
    }
})

// role 1 for normal user , 2 for admin

const userModel = mongoose.model("User",userSchema)

module.exports = userModel