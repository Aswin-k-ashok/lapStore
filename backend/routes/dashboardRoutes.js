import express from 'express'
const router = express.Router()

import { protect } from '../middleware/authMiddleware.js'
import {
  userCount,
  productCount,
  orderCount,
  productProfit,
  userBlockCount,
} from '../controllers/dashboardController.js'

router.route('/user').get(userCount)
router.route('/product').get(productCount)
router.route('/order').get(orderCount)
router.route('/profit').get(productProfit)
router.route('/userblock').get(userBlockCount)

export default router
