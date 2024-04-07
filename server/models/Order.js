const mongoose=require("mongoose")

const orderSchema=new mongoose.Schema({
    
    date:{
        type:mongoose.Schema.Types.Date,
        default:new Date()
    },
    
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    mealId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Meal",
        required:true
    },
    qty:{
        type:Number,
        default:1
    },
    active:{
        type:Boolean,
        default:true
    },
    
    },

    {
        timestamps:true     
})

module.exports = mongoose.model('Order', orderSchema)