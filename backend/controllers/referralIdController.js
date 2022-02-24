// import asyncHandler from 'express-async-handler'
// import generateToken from '../utils/generatrateToken.js'
// import User from '../models/userModel.js'
// import ReferralId from '../models/referralIdModel.js'
// import Wallet from '../models/walletModel.js'
// import dotenv from 'dotenv'

// dotenv.config()

// // @desc Add referral id
// // @route POST /api/referral
// // @access private

// const addReferralId = asyncHandler(async (req, res) => {
//   const userId = req.user._id
//   console.log(userId)
//   const FristReferralPart = req.user.name.slice(0, 4)
//   const SecondReferralPart = req.user.email.slice(0, 4)
//   const referral = FristReferralPart + SecondReferralPart

//   const referralId = new ReferralId({
//     user: userId,
//     referralId: referral,
//   })
//   await referralId.save()
//   res.json('referral created')
// })

// // @desc get referral id
// // @route GET/api/referral
// // @access private
// const getReferralId = asyncHandler(async (req, res) => {
//   const userId = req.user._id
//   const data = await ReferralId.find({
//     user: userId,
//   })
//   res.json(data)
// })

// export { addReferralId, getReferralId }
