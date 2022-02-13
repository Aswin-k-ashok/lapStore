import asyncHandler from 'express-async-handler'
import Category from '../models/categoryModel.js'

// @desc Get all categories
// @route GET/api/categories
// @access Private/admin

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({})
  res.json(categories)
})

// @desc Add a new category
// @route POST/api/categories
// @access Private/Admin

export const addCategories = asyncHandler(async (req, res) => {
  const newCategory = new Category({ name: req.body.name })
  const category = newCategory.save()
  res.json(category)
})
