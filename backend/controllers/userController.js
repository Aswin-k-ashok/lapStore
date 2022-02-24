import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generatrateToken.js'
import User from '../models/userModel.js'
import ReferralId from '../models/referralIdModel.js'
import Wallet from '../models/walletModel.js'

// @desc  Auth user - login
// @route POST/api/users/login
// @access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  const activeUser = user.isActive
  if (!activeUser) {
    res.status(401)
    throw new Error('your account has been suspended')
  } else {
    if (user && (await user.matchPassword(password))) {
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
  const userCount = users.length
  console.log('user count', userCount)
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

// @desc    Check if the given referral Id is valid
// @route   PUT /api/users/referral
// @access  Private
const checkReferralId = asyncHandler(async (req, res) => {
  const referralId = req.body.referralId
  const userId = req.user._id
  let parentUser
  let checked = false

  const referral = await ReferralId.find({})
  referral.forEach(async (item) => {
    if (item.referralId === referralId) {
      checked = true
      parentUser = item.user
      const wallet = new Wallet({
        user: userId,
        balance: 100,
      })
      await wallet.save()
      const test = await Wallet.findOneAndUpdate(
        {
          user: parentUser,
        },
        {
          $inc: { balance: 100 },
        },
        {
          new: true,
          upsert: true,
        }
      )
      res.json('success')
    }
  })

  if (!checked) {
    res.json('fail')
  }
})

// @desc    Add referral id
// @route   POST /api/users/referral
// @access  Private
const addReferralId = asyncHandler(async (req, res) => {
  const userId = req.user._id
  const userToString = userId.toString()
  const referralA = req.user.name.slice(0, 4)
  const referralB = userToString.slice(15, 20)
  const referralC = userToString.slice(1, 4)
  const referral = referralC + referralA + referralB

  const referralId = new ReferralId({
    user: userId,
    referralId: referral,
  })

  await referralId.save()

  res.json(referralId)
})

// @desc    Get referral id
// @route   GET /api/users/referral
// @access  Private
const getReferralId = asyncHandler(async (req, res) => {
  const userId = req.user._id

  const data = await ReferralId.find({
    user: userId,
  })
  res.json(data)
})

// @desc    Get wallet balance
// @route   GET /api/users/wallet
// @access  Private
const showWalletBalance = asyncHandler(async (req, res) => {
  const userId = req.user._id

  const data = await Wallet.find({
    user: userId,
  })
  if (data.length > 0) {
    const response = data[0].balance
    res.json(response)
  } else {
    res.json(0)
  }
})

// @desc    Delete wallet balance
// @route   PUT /api/users/wallet
// @access  Private
const deductWalletBalance = asyncHandler(async (req, res) => {
  const userId = req.user._id
  const amount = req.params.amount

  const test = await Wallet.findOneAndUpdate(
    {
      user: userId,
    },
    {
      $inc: { balance: -amount },
    },
    {
      new: true,
    }
  )

  res.json('success')
})

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  checkReferralId,
  addReferralId,
  getReferralId,
  showWalletBalance,
  deductWalletBalance,
}
