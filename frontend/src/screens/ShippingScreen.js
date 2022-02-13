import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Row, Col, Form, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../component/FormContainer'
import Message from '../component/Message'
import Loader from '../component/Loader'
import CheckoutSteps from '../component/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'
import { listAddress, addToAddresses } from '../actions/userAction'

function ShippingScreen() {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const navigate = useNavigate()
  const location = useLocation()

  const addressList = useSelector((state) => state.addressList)
  const { addresses } = addressList

  const dispatch = useDispatch()

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)
  const [addressSelected, setAddressSelected] = useState()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    dispatch(addToAddresses({ address, city, postalCode, country }))

    navigate('/payment')
  }

  const addressSelector = (data) => {
    setAddressSelected(data)
    if (addressSelected) {
      dispatch(saveShippingAddress(addressSelected))
      navigate('/payment')
    }
  }

  useEffect(() => {
    dispatch(listAddress())
  }, [])

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>shipping</h1>
      <Row>
        <Col>
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
        </Col>

        <Col>
          <h5>Saved Addresses</h5>
          {addresses.map((address) => (
            <Col key={address._id} sm={12} md={6} lg={6} xl={6}>
              <Card
                onClick={(e) => {
                  e.preventDefault()
                  addressSelector({
                    address: address.address,
                    city: address.city,
                    postalCode: address.postalCode,
                    country: address.country,
                  })
                }}
                className='my-1 p-3 bg-dark rounded mb-3'
              >
                <Card.Body>
                  <Card.Text as='div'>address: {address.address}</Card.Text>
                  <Card.Text as='div'>city: {address.city}</Card.Text>
                  <Card.Text as='div'>pin: {address.postalCode}</Card.Text>
                  <Card.Text as='div'>country: {address.country}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Col>
      </Row>
    </FormContainer>
  )
}

export default ShippingScreen
