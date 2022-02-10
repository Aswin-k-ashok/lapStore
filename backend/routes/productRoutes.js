import express, { Router } from 'express'
const router = express.Router()
import { protect, admin, active } from '../middleware/authMiddleware.js'

import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
} from '../controllers/productController.js'

router.route('/').get(getProducts).post(protect, admin, createProduct)

router.route('/:id').get(getProductById, active)

router
  .route('/:id')
  .get(getProductById, active)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

export default router
