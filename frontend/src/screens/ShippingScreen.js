import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../component/FormContainer'
import Message from '../component/Message'
import Loader from '../component/Loader'
import CheckoutSteps from '../component/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

function ShippingScreen() {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const navigate = useNavigate()
  const location = useLocation()

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group contolId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='enter your address'
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rounded
          ></Form.Control>
        </Form.Group>

        <Form.Group contolId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='enter your city'
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            rounded
          ></Form.Control>
        </Form.Group>

        <Form.Group contolId='postalCode'>
          <Form.Label>PostalCode</Form.Label>
          <Form.Control
            type='text'
            placeholder='enter your postalCode'
            required
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            rounded
          ></Form.Control>
        </Form.Group>

        <Form.Group contolId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='enter your country'
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            rounded
          ></Form.Control>
        </Form.Group>

        <Button type='submit'>continue</Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
