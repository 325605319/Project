const { Model } = require("mongoose")
const Meal = require("../models/Meal")
const Order= require("../models/Order")


const createNewMeal = async (req, res) => {
    if (req.user.roles != 'manager') {
        return res.userId(400).json({ message: "no access" })
    }
    const { name, status, image, description, price, kategory } = req.body
    if (!name || !price || !kategory) {
        return res.status(400).json({ message: 'fields are required' })
    }

    const find = await Meal.find({ name })
    if (find?.length)
        return res.send("enter another name")

    const meal = await Meal.create({ name, status, image, description, price, kategory })
    if (meal) {
        return res.status(201).json({ message: 'New meal created' })
    }
    else {
        return res.status(400).json({ message: 'Invalid meal ' })
    }
}

const getAllMeals = async (req, res) => {
    const meals = await Meal.find().lean()
    if (!meals?.length) {
        return res.status(400).json({ message: 'No meals found' })
    }
    res.json(meals)
}

const updateMeal = async (req, res) => {

    if (req.user.roles != 'manager') {
        return res.status(400).json({ message: "no access" })
    }

    const { _id, name, status, image, description, price, kategory } = req.body
    if (!_id || !name) {
        return res.status(400).json({ message: 'Fields are required' })
    }
    const meal = await Meal.findById(_id).exec()
    if (!meal) {
        return res.status(400).json({ message: 'Meal not found' })
    }

    meal.name = name
    meal.status = status
    meal.image = image
    meal.price = price
    meal.description = description
    meal.kategory = kategory

    const updateMeal = await meal.save()
    res.json(`'${updateMeal.name}' updated`)
}
const deleteMeal = async (req, res) => {
    if (req.user.roles != 'manager') {
        return res.status(400).json({ message: "no access" })
    }
    const { _id } = req.body
    const meal = await Meal.findById({ _id: _id }).exec()
    if (!meal) {
        return res.status(400).json({ message: 'Meal not found' })
    }
    const orders = await Order.find({ mealId:meal,active: true }).populate(['userId', 'mealId']).lean()
    orders.forEach(async (e) => {
        if (e.mealId._id==_id) {
            const order = await Order.findById(e._id).exec()
            const result = await order.deleteOne()
            const reply = `Order ID ${e._id} deleted`
        }
    })

    const result = await meal.deleteOne()
    const reply = `Meal' ${result.name}' ID ${result._id} deleted`
    res.json(reply)
}

const getMealById = async (req, res) => {
    const { _id } = req.params

    const meal = await Meal.findById(_id).lean()

    if (!meal) {
        return res.status(400).json({ message: 'No meal found' })
    }
    res.json(meal)
}

const updateMealStatus = async (req, res) => {

    if (req.user.roles != 'manager') {
        return res.status(400).json({ message: "no access" })
    }
    const { mealId } = req.body

    const meal = await Meal.findById(mealId).exec()
    if (!meal) {
        return res.status(400).json({ message: 'Meal not found' })
    }
    meal.status = !meal.status
    const updatedMeal = await meal.save()
    res.json(`'${updatedMeal.name}' updated`)
}

const getMealByKategory = async (req, res) => {
    let meals = []
    const path = req.path
    switch (path) {
        case '/pasta':
            meals = await Meal.find({ kategory: 'pasta' }).lean()
            if (meals?.length)
                return res.json(meals)
            else
                return res.json(meals)
        case '/pizza':
            meals = await Meal.find({ kategory: 'pizza' }).lean()
            if (meals?.length)
                return res.json(meals)
            else
                return res.json(meals)
        case '/salad':
            meals = await Meal.find({ kategory: 'salad' }).lean()
            if (meals?.length)
                return res.json(meals)
            else
                return res.json(meals)
        case '/morning':
            meals = await Meal.find({ kategory: 'morning' }).lean()
            if (meals?.length)
                return res.json(meals)
            else
                return res.json(meals)
        case '/fish':
            meals = await Meal.find({ kategory: 'fish' }).lean()
            if (meals?.length)
                return res.json(meals)
            else
                return res.json(meals)
        case '/dessert':
            meals = await Meal.find({ kategory: 'dessert' }).lean()
            if (meals?.length)
                return res.json(meals)
            else
                return res.json(meals)
        case '/drink':
            meals = await Meal.find({ kategory: 'drink' }).lean()
            if (meals?.length)
                return res.json(meals)
            else
                return res.json(meals)
    }
    return;

    
    
}
const searchMealByName = async (req, res) => {
        try {
            const name=req.path
            console.log(name)
            const meals = await Meal.find({ name: { $regex: name, $options: 'i' } }).lean();
            return res.json(meals);
        } catch (error) {
            console.error("Error while searching meals by name:", error);
            return null;
        }
    };

module.exports = { createNewMeal, getAllMeals, updateMeal, deleteMeal, getMealById, updateMealStatus, getMealByKategory,searchMealByName }