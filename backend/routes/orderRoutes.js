import express from 'express'
const router = express.Router()

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} from '../controllers/orderController.js'
import { protect, active } from '../middleware/authMiddleware.js'

router.route('/').post(protect, active, addOrderItems)
router.route('/myorders').get(protect, active, getMyOrders)
router.route('/:id').get(protect, active, getOrderById)
router.route('/:id/pay').put(protect, active, updateOrderToPaid)

export default router
