import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import Category from '../models/categoryModel.js'
import cloudinary from 'cloudinary'

//@desc  fetch all products form db
//@route GET/api/products
//@access public
const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}
  const product = await Product.find({ ...keyword })
  res.json(product)
  // const products = await Product.find({})
  // res.json(products)
})

//@desc  fetch a single product form db
//@route GET/api/products/:id
//@access public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('product not found')
  }
})

//@desc  delete a product
//@route Delete/api/products/:id
//@access priveate/admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'product removed' })
  } else {
    res.status(404)
    throw new Error('product not found')
  }
})

//@desc  create a product
//@route post/api/products
//@access priveate/admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'sample name',
    price: 0,
    user: req.user._id,
    image: 'sample.jpg',
    images: [],
    brand: 'sample brand',
    category: 'sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'sample description',
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

//@desc  update a product
//@route put/api/products/id
//@access priveate/admin

const updateProduct = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { name, price, image, description, brand, category, countInStock } =
    req.body

  let images = []

  if (images) {
    if (typeof req.body.images === 'string') {
      images.push(req.body.images)
    } else {
      images = req.body.images
    }
  }

  let imagesLinks = []

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: 'products',
      // width: 150,
      // height: 150,
      crop: 'scale',
    })
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    })
  }
  req.body.images = imagesLinks

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.image = image
    product.extraImages = req.body.images
    product.description = description
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()

    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('product not found')
  }
})

// @desc Create new rview
// @route Post/api/products/:id/review
// @access private

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )
    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('product not found')
  }
})

// @desc get product report
// @route get/api/report/product
// @access private admin

const getProductsReport = asyncHandler(async (req, res) => {
  const product = await Product.find({})
  const productNum = product.length
  const categories = await Category.find({})
  const categoriesNum = categories.length

  const categoryData = await Product.aggregate([
    {
      $group: {
        _id: '$category',
        qty: { $sum: 1 },
      },
    },
    {
      $project: {
        category: '$_id',
        qty: 1,
      },
    },
  ])
  res.json({
    productCount: productNum,
    categoriesCount: categoriesNum,
    categoryReport: categoryData,
  })
})

export {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getProductsReport,
}
