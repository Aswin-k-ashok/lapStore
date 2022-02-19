import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generatrateToken.js'
import User from '../models/userModel.js'
import Product from '../models/productModel.js'

// @desc to get user count
// @route GET/api/dashboard/user
// @access public

const userCount = asyncHandler(async (req, res) => {
  const user = await User.find({})
  const userCount = user.length
  console.log('new user count is', userCount)
  res.json(userCount)
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

export { userCount, productCount }
