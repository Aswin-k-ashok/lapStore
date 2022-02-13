import express from 'express'
const router = express.Router()

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDeliverd,
  updateOrderToCancel,
} from '../controllers/orderController.js'
import { protect, active } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, updateOrderToDeliverd)
router.route('/:id/cancel').put(protect, updateOrderToCancel)

export default router
