const mongoose=require("mongoose")

const mealSchema=new mongoose.Schema({
    


    name:{
        type:String,
        required:true
    },

    status:{
        type:String,
        default:true
    },
    image:{
        type:String,
        // default:'background/6.jpg'
    },
    description:{
        type:String
    },
    price:{
        type:Number,
        required:true
    },
    kategory:{
        type:String,
        required:true
    },
    
    },

    {
        timestamps:true     
})

module.exports = mongoose.model('Meal', mealSchema)