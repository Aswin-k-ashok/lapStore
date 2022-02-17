import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Row, Col, Form, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../component/FormContainer'
import Message from '../component/Message'
import Loader from '../component/Loader'
import CheckoutSteps from '../component/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    navigate('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('')
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    console.log(paymentMethod)
    navigate('/placeorder')
  }

  return (
    <Container>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as='legend'>
              <h4>Select A Payment Method</h4>
            </Form.Label>

            <Col className='d-flex flex-column bg-danger p-5 rounded'>
              <Form.Check
                type='radio'
                label='cash on delevery'
                id='cod'
                name='paymentMethod'
                value='cashOnDelivery'
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>

              <Form.Check
                type='radio'
                label='Razorpay'
                id='Razorpay'
                name='paymentMethod'
                value='razorpay'
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>

              <Form.Check
                type='radio'
                label='paypal'
                id='paypal'
                name='paymentMethod'
                value='PayPal'
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>

          <Button type='submit'>continue</Button>
        </Form>
      </FormContainer>
    </Container>
  )
}

export default PaymentScreen
