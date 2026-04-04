import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import cors from 'cors'
dotenv.config()
let app=express()
let port=process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:true,
    credentials:true
}))
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

app.listen(port,()=>{
    connectDB()
    console.log("server started")
})


