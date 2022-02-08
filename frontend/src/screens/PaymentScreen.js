import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../component/FormContainer'
import Message from '../component/Message'
import Loader from '../component/Loader'
import CheckoutSteps from '../component/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen() {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const navigate = useNavigate()
  const location = useLocation()

  if (!shippingAddress) {
    navigate('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('paypal')
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>select method</Form.Label>
        </Form.Group>

        <Col className='mr-auto'>
          <Form.Check
            type='radio'
            label='cash on delevery'
            id='cod'
            name='paymentMethod'
            value='cod'
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>

          <Form.Check
            type='radio'
            label='paypal'
            id='paypal'
            name='paymentMethod'
            value='pypal'
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Col>

        <Button type='submit'>continue</Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
