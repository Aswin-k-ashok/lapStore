import express from 'express'
const router = express.Router()
import { protect, admin, active } from '../middleware/authMiddleware.js'

import {
  authUser,
  getUserProfile,
  getUsers,
  getUserById,
  // getUserCount,
  registerUser,
  updateUserProfile,
  updateUser,
  checkReferralId,
  addReferralId,
  getReferralId,
  showWalletBalance,
  deductWalletBalance,
} from '../controllers/userController.js'

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router.put('/wallet/:amount', deductWalletBalance)
router.route('/wallet').get(protect, showWalletBalance)

router
  .route('/referral')
  .get(protect, getReferralId)
  .post(protect, addReferralId)
  .put(protect, checkReferralId)

router.route('/:id').get(protect, admin, getUserById).put(updateUser)
// router.route('/userCount').get(getUserCount)
export default router
