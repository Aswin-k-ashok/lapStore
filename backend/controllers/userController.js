import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generatrateToken.js'
import User from '../models/userModel.js'

// @desc  Auth user - login
// @route POST/api/users/login
// @access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  const activeUser = user.isActive
  if (user && activeUser && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('invalid email / password')
  }
})

// @desc  Get user profile with JWT
// @route GET/api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      isAdmin: user.isAdmin,
      isActive: user.isActive,
    })
  } else {
    res.status(404)
    throw new Error('user not find')
  }
})

// @desc  Register a new user
// @route POST/api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body
  const userExist = await User.findOne({ email })

  if (userExist) {
    res.status(400)
    throw new Error('user already exist')
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
  })
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      isActive: user.isActive,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('invalid user data')
  }
})

// @desc  update user profile with
// @route PUT/api/users/profile
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.phone = req.body.phone || user.phone
    user.address = req.body.address || user.address
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      phone: updatedUser.phone,
      address: updatedUser.address,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('user not find')
  }
})

//@desc  get all users in admin screen
//@route GET/api/users
//@access private/admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

//@desc  get a single user by id
//@route GET/api/users/:id
//@access private/admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('user not found')
  }
})

//@desc  block user
//@route PUT/api/users/:id
//@access private/admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  console.log(user)
  if (user) {
    if (user.isAdmin) {
      res.json({ message: 'cannot block admin', updadatedUser })
    } else {
      user.isActive = !user.isActive
      const updadatedUser = await user.save()
      if (user.isActive == true) {
        res.json({ message: 'user unblocked', updadatedUser })
      } else {
        res.json({ message: 'user is blocked', updadatedUser })
      }
    }
  }
})

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
}
