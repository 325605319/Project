const User=require("../models/User")
const bcrypt=require("bcrypt")
const jwt= require('jsonwebtoken')

const login=async(req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        return res.status(404).json({message:"All fields are required"})
    }
    const findOne= await User.findOne({email}).lean()
    if(!findOne){
        return res.status(401).json({message:"Unauthorized"})
    }

    const match=await bcrypt.compare(password,findOne.password)
    if(!match){
        return res.status(401).json({message:"Unauthorized"})
    }

    const newUser={_id:findOne._id,userName:findOne.userName,email:findOne.email,phone:findOne.phone,roles:findOne.roles,address:findOne.address}
    const accessToken=jwt.sign(newUser,process.env.TOKEN)

    res.json({token:accessToken,newUser:newUser.roles,userId:newUser._id,userName:newUser.userName})
}


const register=async(req,res)=>{
    const {userName, password, email, phone,address} = req.body
    if(!userName||!email||!password||!phone){
        return res.status(404).json({message:"All fields are required"})
    }

    for(let i=0;i<email.length;i++){
        if(email.indexOf(i)<'a'||email.indexOf(i)>'z')
        return res.send("Your email is not valid ")
    }


    const duplicate=await User.findOne({email}).lean()
    if(duplicate){
        return res.status(404).json({message:"this email alrady exsist"})
    }

    const hashPassword=await bcrypt.hash(password,10)
    const userObj= {email,userName,phone,password:hashPassword,address}
    const user=await User.create(userObj)
    if(user){
        return res.status(201).json({message:"new user created"})
    }
    else{
        return res.status(404).json({message:"not success"})
    }

}

module.exports={login,register}