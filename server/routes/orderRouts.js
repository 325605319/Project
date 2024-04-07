const express = require("express")
const router = express.Router()
const Order = require("../models/Order")
const JWT=require("../middleWare/verifyJWT")

const {historyById,getSumByUserId,updateOrderActive,createNewOrder,getAllOrders,updateOrder,deleteOrder,getAllOrdersByUserId}=require("../controllers/orderController")

router.post('/',createNewOrder)
router.get('/',JWT,getAllOrders)
router.put('/',JWT,updateOrder)
router.delete('/',JWT,deleteOrder)
router.get('/byId',JWT,getAllOrdersByUserId)
router.put('/active',JWT,updateOrderActive)
router.get('/sum',JWT,getSumByUserId)
router.get('/history',JWT,historyById)

module.exports=router