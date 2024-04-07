const mongoose=require("mongoose")

const saleSchema=new mongoose.Schema({
    
    startDate:{
        type:mongoose.Schema.Types.Date,
    },
    
    endDate:{
        type:mongoose.Schema.Types.Date,
    },

    present:{
        type:Number
    }
    
    },

    {
        timestamps:true     
})

module.exports = mongoose.model('Sale', saleSchema)