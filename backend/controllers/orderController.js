import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

//@desc  create new order
//@route POST/api/orders
//@access priveate
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderitems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPirce,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      orderitems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPirce,
      totalPrice,
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
})

export { addOrderItems }
