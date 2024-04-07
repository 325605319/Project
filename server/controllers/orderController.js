const { Model } = require("mongoose")
const Order = require("../models/Order")
const Meal = require("../models/Meal")

const createNewOrder = async (req, res) => {
    const { date, userId, mealId, qty } = req.body
    if (!mealId || !userId) {
        return res.status(400).json({ message: 'fields are required' })
    }

    const order = await Order.findOne({ mealId, userId, active: true }).exec()
    if (!order) {
        const newOrder = await Order.create({ date, mealId, userId, qty })
        if (newOrder) {
            return res.status(201).json({ message: 'New order created' })
        }
        else {
            return res.status(400).json({ message: 'Invalid order' })
        }
    }
    else {
        order.date = date
        order.qty += qty
        const updateOrder = await order.save()
        res.json(`'${updateOrder.mealId}' updated`)
    }
}

const getAllOrders = async (req, res) => {
    if (req.user.roles != 'manager') {
        return res.status(400).json({ message: "no access" })
    }
    const orders = await Order.find().lean()
    if (!orders?.length) {
        return res.json([])
    }
    res.json(orders)
}

const getAllOrdersByUserId = async (req, res) => {
    const userId = req.user._id
    const orders = await Order.find({ userId: userId, active: true }).populate(['userId', 'mealId']).lean()
    if (!orders?.length) {
        return res.json([])
    }
    res.json(orders)
}

const historyById = async (req, res) => {
    const userId = req.user._id
    const orders = await Order.find({ userId: userId, active: false }).populate(['userId', 'mealId']).lean()
    if (!orders?.length) {
        return res.json([])
    }
    res.json(orders)
}

const getSumByUserId = async (req, res) => {
    let sum = 0;
    const userId = req.user._id
    const orders = await Order.find({ userId: userId, active: true }).populate(['userId', 'mealId']).lean()
    if (!orders?.length) {
        return res.json([])
    }
    
    orders.forEach((e) => {
        if(e.mealId)
            sum = sum + (e.mealId.price * e.qty)
    })

    res.json({ sum })
}

const updateOrder = async (req, res) => {
    const { _id, date, userId, mealId, qty } = req.body
    if (req.user._id != userId) {
        return res.status(400).json({ message: "no access" })
    }
    if (!_id || !mealId || !date) {
        return res.status(400).json({ message: 'Fields are required' })
    }
    const order = await Order.findById(_id).exec()
    if (!order) {
        return res.status(400).json({ message: 'Order not found' })
    }

    order.mealId = mealId
    order.date = date
    order.userId = userId
    order.qty = qty

    const updateOrder = await order.save()
    res.json(`'${updateOrder.mealId}' updated`)
}


const deleteOrder = async (req, res) => {

    const { _id, userId } = req.body
    if (req.user._id != userId) {
        return res.status(400).json({ message: "no access" })
    }
    const order = await Order.findById(_id).exec()
    if (!order) {
        return res.status(400).json({ message: 'Order not found' })
    }
    const result = await order.deleteOne()
    const reply = `Order ID ${_id} deleted`
    res.json(reply)
}

const updateOrderActive = async (req, res) => {

    const userId = req.user._id
    const orders = await Order.find({ userId: userId })
    if (!orders) {
        return res.status(400).json({ message: 'Orders not found' })
    }
    orders.forEach(async (e) => {
        e.active = false
        const updateOrder = await e.save()

    })
    res.json(` updated`)

}
module.exports = { historyById,getSumByUserId, createNewOrder, getAllOrders, updateOrder, deleteOrder, getAllOrdersByUserId, updateOrderActive }