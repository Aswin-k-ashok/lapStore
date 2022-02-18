import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import colours from 'colors'
import Razorpay from 'razorpay'
import cloudinary from 'cloudinary'
import shortid from 'shortid'
import morgan from 'morgan'
import connectDB from './config/db.js'
import productRoute from './routes/productRoutes.js'
import userRoute from './routes/userRoutes.js'
import orderRoute from './routes/orderRoutes.js'
import uploadRoute from './routes/uploadRoutes.js'
import addressRoute from './routes/addressRoutes.js'
import categoryRoute from './routes/categoryRoutes.js'
import offerRoute from './routes/offerRoutes'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

//CLOUDINARY CONFIG
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// RAZOR PAY CONFIG

var razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

const getOrder = async (id) => {
  const data = Order.findById(id).populate('user', 'name email')
  return data
}

app.post('/razorpay/:id', async (req, res) => {
  const order = await getOrder(req.params.id)
  const payment_capture = 1
  const amount = 500
  const currency = 'INR'

  const options = {
    amount: order.totalPrice * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  }

  try {
    const response = await razorpay.orders.create(options)
    res.status(200).json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    })
  } catch (error) {
    console.log(error)
  }
})

app.post('/razorpay/success/:id', async (req, res) => {
  const order = await getOrder(req.params.id)
  order.isPaid = true
  order.paidAt = Date.now()
  await order.save()
  res.status(200).json('success')
})

app.get('/', (req, res) => {
  res.send('API is active')
})

app.use('/api/products', productRoute)
app.use('/api/users', userRoute)
app.use('/api/orders', orderRoute)
app.use('/api/upload', uploadRoute)
app.use('/api/address', addressRoute)
app.use('/api/categories', categoryRoute)
app.use('/api/offer', offerRoute)

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
