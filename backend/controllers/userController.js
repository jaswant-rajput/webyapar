
const User = require("./../models/userModel")

exports.login = async(req,res) => {
    try {
        
        const user = await User.findOne({
            userID : req.body.userID * 1,
            password : req.body.password
        },{password :0})
        
        if(user){
            res.json({
                success : true,
                messgae : "logged in",
                user
            })
        }else {
            res.json({
                success : false,
                message : "Invalid credentials"
            })
        }
    }catch(err){
        console.log(err)
        res.json({
            success : false,
            err
        })
    }
}

exports.createUser = async(req,res) => {
    try {
        const user = await User.create(req.body)
        res.json({
            success : true,
            message : "User created"
        })
    }catch(err){
        res.json({
            success : false,
            err
        })
    }
}

exports.acceptUserData = async(req,res) => {
    try {
        const user = await User.findByIdAndUpdate(req.body._id,{$set : {accepted : true}},{new:true})
        res.json({
            success:true,
            user
        })
    }catch(err){
        res.json({
            success : false,
            err
        })
    }
}

exports.getTwoUsers = async(req,res) => {
    try {
        const users = await User.find({role : 1}).limit(2)
        res.json({
            success : true,
            users
        })
    }catch(err){
        console.log(err)
        res.json({
            success : false,
            err
        })
    }
}

exports.getAllUsers = async(req,res) => {
    try {
        const users = await User.find({role : 1})
        res.json({
            success : true,
            users
        })
    }
    catch(err){
        console.log(err)
        res.json({
            success : false,
            err
        })
    }
}

exports.deleteUser = async(req,res) => {
    try {
        const user = await User.findByIdAndDelete(req.body._id)
        res.json({
            success : true,
            message : `User with id ${user.userID} deleted`
        })
    }catch(err){
        console.log(err)
        res.json({
            success : false,
            err
        })
    }
}