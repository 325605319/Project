const mongoose=require("mongoose")

const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI)
    }
    catch (err) {
        console.error("*****❤********love********❤*****\n"+err)
    }
}

module.exports=connectDb