import express, { Router } from 'express'
const router = express.Router()

import {
  getProducts,
  getProductById,
} from '../controllers/productController.js'

//@desc  fetch all products form db
//@route GET/api/products
//@access public

router.route('/').get(getProducts)

//@desc  fetch a single product form db
//@route GET/api/products/:id
//@access public

router.route('/:id').get(getProductById)

export default router
