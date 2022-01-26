import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//@desc  fetch all products form db
//@route GET/api/products
//@access public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

//@desc  fetch a single product form db
//@route GET/api/products/:id
//@access public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('product not found')
  }
})

export { getProductById, getProducts }
