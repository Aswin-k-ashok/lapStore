import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      console.log(decoded)

      req.user = await User.findById(decoded.id).select('-password')
      if (req.user.isActive) {
        next()
      } else {
        res.status(401)
        throw new Error('you have been blocked')
      }
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Your account has been suspended')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('no token ')
  }
})
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as admin')
  }
}
const active = (req, res, next) => {
  if (req.user && req.user.isActive) {
    next()
  } else {
    res.status(403)
    throw new Error('you have been blocked')
  }
}
export { protect, admin, active }
