
import express from 'express'
import dotenv from 'dotenv'
import colours from 'colors'
import connectDB from './config/db.js'
import productRoute from './routes/productRoutes.js'
import {notFound,errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

app.get('/',(req,res)=>{
    res.send("hello there")
})



app.use('/api/products',productRoute) 

app.use(notFound)

app.use(errorHandler)




const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server running at ${PORT}`.green.underline.bold))