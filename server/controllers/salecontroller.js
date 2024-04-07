const { Model } = require("mongoose")
const Sale = require("../models/Sale")

const createNewSale = async (req, res) => {
    if (req.user.roles != 'manager') {
        return res.userId(400).json({ message: "no access" })
    }

    const { startDate,endDate,present } = req.body
    if (!startDate || !endDate || !present) {
        return res.status(400).json({ message: 'fields are required' })
    }

    const sale = await Sale.create({ startDate,endDate,present })
    if (sale) {
        return res.status(201).json({ message: 'New sale created' })
    }
    else {
        return res.status(400).json({ message: 'Invalid sale ' })
    }
}

const getAllSales = async (req, res) => {
    const sales = await Sale.find().lean()
    if (!sales?.length) {
        return res.status(400).json({ message: 'No sales found' })
    }
    res.json(sales)
}

const updateSale = async (req, res) => {

    if (req.user.roles != 'manager') {
        return res.status(400).json({ message: "no access" })
    }
    const { _id, startDate,endDate,present  } = req.body
    if (!_id ||  !startDate||!endDate||!present ) {
        return res.status(400).json({ message: 'Fields are required' })
    }

    const sale = await Sale.findById(_id).exec()
    if (!sale) {
        return res.status(400).json({ message: 'Sale not found' })
    }

    sale.startDate=startDate,
    sale.endDate=endDate,
    sale.present=present

    const updateSale = await sale.save()
    res.json(`'${updateSale.name}' updated`)
}
const deleteSale = async (req, res) => {

    if (req.user.roles != 'manager') {
        return res.status(400).json({ message: "no access" })
    }
    const { _id } = req.body
    console.log(_id)
    const sale = await Sale.findById({ _id: _id }).exec()
    if (!sale) {
        return res.status(400).json({ message: 'Sale not found' })
    }
    const result = await sale.deleteOne()
    const reply = `Sale' ${result.name}' ID ${result._id} deleted`
    res.json(reply)
}

const getSaleByKategory = async (req, res) => {
    let sales = []
    const path = req.path
    switch (path) {
        case '/pasta':
            sales = await Sale.find({ kategory: 'pasta' }).lean()
            if (sales?.length)
                return res.json(sales)
            else
                return res.json(sales)
        case '/pizza':
            sales = await Sale.find({ kategory: 'pizza' }).lean()
            if (sales?.length)
                return res.json(sales)
            else
                return res.json(sales)
        case '/salad':
            sales = await Sale.find({ kategory: 'salad' }).lean()
            if (sales?.length)
                return res.json(sales)
            else
                return res.json(sales)
        case '/morning':
            sales = await Sale.find({ kategory: 'morning' }).lean()
            if (sales?.length)
                return res.json(sales)
            else
                return res.json(sales)
        case '/fish':
            sales = await Sale.find({ kategory: 'fish' }).lean()
            if (sales?.length)
                return res.json(sales)
            else
                return res.json(sales)
        case '/dessert':
            sales = await Sale.find({ kategory: 'dessert' }).lean()
            if (sales?.length)
                return res.json(sales)
            else
                return res.json(sales)
        case '/drink':
            sales = await Sale.find({ kategory: 'drink' }).lean()
            if (sales?.length)
                return res.json(sales)
            else
                return res.json(sales)
    }
    return;
}

module.exports = { createNewSale, getAllSales, updateSale, deleteSale, getSaleById, updateSaleStatus, getSaleByKategory }