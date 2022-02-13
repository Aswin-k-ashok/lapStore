import express from 'express'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  getCategories,
  addCategories,
} from '../controllers/categoryController.js'

router
  .route('/')
  .get(protect, getCategories)
  .post(protect, admin, addCategories)

export default router
