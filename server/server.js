require("dotenv").config()
const express=require("express")
const cors=require("cors")
const mongoose = require("mongoose")

const connectDb=require("./config/dbConn")
const corsOption=require("./config/corsOptions")

const PORT=process.env.PORT || 1593
const app=express()

connectDb()

app.use(express.json())
app.use(express.static("public"))
app.use(cors(corsOption))
app.use('/api/meals',require("./routes/mealRouts"))
app.use('/api/users',require("./routes/userRouts"))
app.use('/api/auth',require("./routes/authRouts"))
app.use('/api/orders',require("./routes/orderRouts"))


app.get('/',(req,res)=>{
    res.send("this is the home page")
})

mongoose.connection.once('open',()=>{
    console.log("connected")
    app.listen(PORT,()=>{
        console.log(`this project running on port ${PORT}`)
    })
})

mongoose.connection.on('error',()=>{
    console.log("err")
})

