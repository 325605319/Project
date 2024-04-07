const mongoose = require('mongoose')
const Meal = require('./Meal')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
        
    },
    img: {
        type: String,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true
    },
    phone: {
        type: String,
    },
    roles: {
        type: String,
        enum: ['manager', 'client'],
        default: 'client'
    },
    address: {
        type: String,
    },


}, {
    timestamps: true
})
module.exports = mongoose.model('User', userSchema)






