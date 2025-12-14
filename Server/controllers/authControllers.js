const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const login = async (req,res)=>{
    const {username,password} = req.body
    if(!username || !password){
        return res.status(400).json({message:"All fields are requierd"})
    }
    const foundUser = await User.findOne({username:username}).lean()
    if(!foundUser){
        return res.status(401).json({message:"Unauthourized"})
    }
    const match = await bcrypt.compare(password,foundUser.password)
    if(!match){
        return res.status(401).json({message:"Unauthourized"})
    }
    const user = {
        _id:foundUser._id,
        name:foundUser.name,
        username:foundUser.username,
        roles:foundUser.roles,
        email:foundUser.email
    }
    const accesstoken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accesstoken,user})
}

const register = async (req,res)=>{
    const {username,password,name,email,phone} = req.body
    if(!username || !password || !name || !email || !phone){
        return res.status(400).json({message:"All fields are requierd"})
    }
    const duplicateUser = await User.findOne({username:username})
    if(duplicateUser){
        return res.status(409).json({message:"duplicate user"})
    }
    const hashpassword = await bcrypt.hash(password,10)
    const user = await User.create({username,password:hashpassword,name,email,phone})
    if(!user){
        return res.status(400).json({message:"Bad request"})
    }
    res.json(`user ${user._id} enter`)
}

module.exports = {login,register}