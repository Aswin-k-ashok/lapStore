import express from 'express'
const router = express.Router()

import { addAddress, getAddresses } from '../controllers/addressController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/:userId').get(protect, getAddresses).put(protect, addAddress)

export default router
