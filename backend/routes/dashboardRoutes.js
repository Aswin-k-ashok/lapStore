import express from 'express'
const router = express.Router()

import { protect } from '../middleware/authMiddleware.js'
import { userCount, productCount } from '../controllers/dashboardController.js'

router.route('/user').get(userCount)
router.route('/product').get(productCount)

export default router
