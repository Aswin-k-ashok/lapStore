import express from 'express'
const router = express.Router()
import { protect, admin, active } from '../middleware/authMiddleware.js'

import {
  authUser,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserProfile,
  getUserById,
  updateUser,
} from '../controllers/userController.js'

router.route('/').post(registerUser).get(protect, admin, active, getUsers)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, active, getUserProfile)
  .put(protect, active, updateUserProfile)
router.route('/:id').get(protect, admin, active, getUserById).put(updateUser)
export default router
