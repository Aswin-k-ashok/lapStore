import express, { Router } from 'express'
const router = express.Router()
import { protect, admin, active } from '../middleware/authMiddleware.js'

import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getProductsReport,
} from '../controllers/productController.js'

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/report').get(getProductsReport)

router.route('/:id').get(getProductById)
router.route('/:id/reviews').post(protect, createProductReview)

router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)
export default router
