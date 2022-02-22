import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generatrateToken.js'
import User from '../models/userModel.js'
import Product from '../models/productModel.js'
import Order from '../models/orderModel.js'

// @desc to get user count
// @route GET/api/dashboard/user
// @access public

const userCount = asyncHandler(async (req, res) => {
  const user = await User.find({})
  const userCount = user.length
  console.log('new user count is', userCount)
  res.json(userCount)
})

// @desc to get number of blocked user
// @route GET/api/dashboard/userblock
// @access public

const userBlockCount = asyncHandler(async (req, res) => {
  const blockUser = await User.find({ isActive: false })
  const bolckUserCount = blockUser.length
  res.json(bolckUserCount)
})

// @desc to get product count
// @route GET/api/dashboard/product
// @access public

const productCount = asyncHandler(async (req, res) => {
  const product = await Product.find({})
  const productCount = product.length
  res.json(productCount)
})

// @desc to get order count
// @route GET/api/dashboard/order
// @access public

const orderCount = asyncHandler(async (req, res) => {
  const order = await Order.find({})
  const orderCount = order.length
  res.json(orderCount)
})

// @desc to get total profit
// @route GET/api/dashboard/profit
// @access public

const productProfit = asyncHandler(async (req, res) => {
  const profit = await Order.aggregate([
    {
      $group: {
        _id: null,
        price: {
          $sum: '$totalPrice',
        },
      },
    },
  ])
  console.log('profit', profit)
  res.json(profit[0].price)
})

// _id: { day: { $dayOfYear: "$date"}, year: { $year: "$date" } },
// totalAmount: { $sum: { $multiply: [ "$price", "$quantity" ] } },
// count: { $sum: 1 }

export { userCount, productCount, orderCount, productProfit, userBlockCount }
