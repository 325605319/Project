const express = require("express")
const router = express.Router()
const Meal = require("../models/Meal")
const JWT=require("../middleWare/verifyJWT")

const {createNewMeal,getAllMeals,updateMeal,deleteMeal,getMealById,searchMealByName,updateMealStatus,getMealByKategory}=require("../controllers/mealController")

router.post('/',JWT,createNewMeal)
router.get('/',getAllMeals)
router.put('/',JWT,updateMeal)
router.delete('/',JWT,deleteMeal)
router.get('/',getMealById)
router.put('/updateStatus/',JWT,updateMealStatus)
router.get('/salad',getMealByKategory)
router.get('/pasta',getMealByKategory)
router.get('/pizza',getMealByKategory)
router.get('/morning',getMealByKategory)
router.get('/dessert',getMealByKategory)
router.get('/fish',getMealByKategory)
router.get('/drink',getMealByKategory)
router.get('/search',searchMealByName)


module.exports=router