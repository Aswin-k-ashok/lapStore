import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import colours from 'colors'
import connectDB from './config/db.js'
import productRoute from './routes/productRoutes.js'
import userRoute from './routes/userRoutes.js'
import orderRoute from './routes/orderRoutes.js'
import uploadRoute from './routes/uploadRoutes.js'
import addressRoute from './routes/addressRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is active')
})

app.use('/api/products', productRoute)
app.use('/api/users', userRoute)
app.use('/api/orders', orderRoute)
app.use('/api/upload', uploadRoute)
app.use('/api/address', addressRoute)

app.use('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)

app.use(errorHandler)

app.use(cors())

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server running at ${PORT}`.green.underline.bold))
