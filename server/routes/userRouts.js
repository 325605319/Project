const express=require("express")
const router=express.Router()
const User=require('../models/User')
const userController=require('../controllers/userController')
const JWT=require("../middleWare/verifyJWT")

router.get("/",JWT,userController.getAllUsers)
router.get("/:_id",JWT,userController.getUserById)
router.delete("/",JWT,userController.deleteUser)
router.put("/",JWT,userController.updateUser)

module.exports=router