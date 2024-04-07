const { Model } = require("mongoose")
const User = require("../models/User")

const getAllUsers=async (req,res)=>{
    
    if(req.user.roles!='manager'){
        return res.status(401).json({message:"no access"})
    }
    const users=await User.find().lean()
    if (!users?.length){
        return res.status(400).json({message:'No users found'})
    }
    res.json(users)
}

const updateUser=async(req,res)=>{

    const {_id,userName, email,img, address, phone,password}=req.body
    if(req.user._id!=_id && req.user.roles!='manager'){
        return res.status(401).json({message:'Unauthorized'})
    }
    if(!_id||!email)
    {
        return res.status(400).json({message:'Fields are required'})
    }
    const duplicate=await User.find({email})
    if(duplicate.length>1){
        return res.status(404).json({message:"this userName alrady exsist"})
    }
    const user=await User.findById(_id).exec()
    if(!user){
        return res.status(400).json({message:'User not found'})
    }
    if(email){
    for(let i=0;i<email.length;i++){
        if(email.indexof(i)<'a'||email.indexof(i)>'z')
            res.send("enter email with lower latters")
    }
}
    user.userName=userName
    user.email=email
    user.address=address
    user.phone=phone
    user.password=password
    user.img=img

    const updateUser=await user.save()
    res.json(`'${updateUser.userName}' updated`)
}
const deleteUser=async(req,res)=>{
    const{_id}=req.body
    if(req.user._id!=_id && req.user.roles!='manager'){
        return res.status(401).json({message:'Unauthorized'})
    }
    const user=await User.findById(_id).exec()
    if(!user){
        return res.status(400).json({message:'User not found'})
    }
    const result=await user.deleteOne()
    const reply=`User' ${result.userName}' ID ${result._id} deleted`
    res.json(reply)
}

const getUserById = async (req, res) => {
    if(req.user.roles!='manager'){
        return res.status(401).json({message:"Unauthorized"})
    }

    const user = await User.findById(_id).lean()

    if (!user) {
    return res.status(400).json({ message: 'No user found' })
    }
    res.json(user)
}

module.exports={getAllUsers,updateUser,deleteUser,getUserById}